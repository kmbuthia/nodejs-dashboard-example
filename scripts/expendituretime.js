
var csv = require('fast-csv');
var fs = require('fs');
var Hashmap = require('hashmap');

var getExpenditure = function(dept, dFrom, dTo, callback){
	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
 	
 	var plannedcost = [];
 	var actualcost = [];
 	var startdate = [];
 	var yearPlanned = new Hashmap();
 	var yearActual = new Hashmap();
 	
 	var year;
 	//var sumplanned = 0;
 	//var sumactual = 0;
 	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	     //console.log(data.Actual_Cost_M);
	     if(dept=="All"){
	     	//Now check the date range
	     	year = new Date(data.Start_Date);
	     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	     		//console.log(year.getFullYear());
	     		if(startdate.length>0){
	     			if(startdate[startdate.length-1]==year.getFullYear()){
	     				if(data.Planned_Cost_M.length>0){
	     					if(yearPlanned.has(year.getFullYear())){
	     						var tempPlanned = yearPlanned.get(year.getFullYear());
	     						var newPlanned = (Number(tempPlanned)+Number(data.Planned_Cost_M));
	     						yearPlanned.set(Number(year.getFullYear()), Number(newPlanned).toFixed(4));
	     					}
	     					else{
	     						yearPlanned.set(Number(year.getFullYear()), Number(data.Planned_Cost_M).toFixed(4));
	     					}
	     				}
	     				if(data.Actual_Cost_M.length>0){
	     					if(yearActual.has(year.getFullYear())){
	     						var tempActual = yearActual.get(year.getFullYear());
	     						var newActual = (Number(tempActual)+Number(data.Actual_Cost_M));
	     						yearActual.set(Number(year.getFullYear()), Number(newActual).toFixed(4));
	     					}
	     					else{
	     						yearActual.set(Number(year.getFullYear()), Number(data.Actual_Cost_M).toFixed(4));
	     					}	     				}
	     			}
	     			//Check if a year was skipped
	     			else if(startdate[startdate.length-1]!==year.getFullYear()-1){
	     				startdate.push(Number(startdate[startdate.length-1])+1);
	     				yearPlanned.set(Number(startdate[startdate.length-1])+1, 0);
	     				yearActual.set(Number(startdate[startdate.length-1])+1, 0);
	     			}
	     			else{
	     				startdate.push(Number(year.getFullYear()));	     				
	     			}
	     		}
	     		else{
	     			//We are at the very first entry so add it to the relevant data structures
	     			var formattedPlanned = (Number(data.Planned_Cost_M)).toFixed(4);
     				var formattedActual = (Number(data.Actual_Cost_M)).toFixed(4);
		     		startdate.push(Number(year.getFullYear()));
		     		yearPlanned.set(Number(year.getFullYear()), Number(formattedPlanned));
		     		yearActual.set(Number(year.getFullYear()), Number(formattedActual));		
	     		}
	     	}
	     }
	     else if(dept==data.Agency_Name){
	     	//Now check the date range
	     	year = new Date(data.Start_Date);
	     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	     		//console.log(year.getFullYear());
	     		if(startdate.length>0){
	     			if(startdate[startdate.length-1]==year.getFullYear()){
	     				if(data.Planned_Cost_M.length>0){
	     					if(yearPlanned.has(year.getFullYear())){
	     						var tempPlanned = yearPlanned.get(year.getFullYear());
	     						var newPlanned = (Number(tempPlanned)+Number(data.Planned_Cost_M));
	     						yearPlanned.set(Number(year.getFullYear()), Number(newPlanned).toFixed(4));
	     					}
	     					else{
	     						yearPlanned.set(Number(year.getFullYear()), Number(data.Planned_Cost_M).toFixed(4));
	     					}
	     					//sumplanned += Number(data.Planned_Cost_M);
	     				}
	     				if(data.Actual_Cost_M.length>0){
	     					if(yearActual.has(year.getFullYear())){
	     						var tempActual = yearActual.get(year.getFullYear());
	     						var newActual = (Number(tempActual)+Number(data.Actual_Cost_M));
	     						yearActual.set(Number(year.getFullYear()), Number(newActual).toFixed(4));
	     					}
	     					else{
	     						yearActual.set(Number(year.getFullYear()), Number(data.Actual_Cost_M).toFixed(4));
	     					}
	     					//sumactual += Number(data.Actual_Cost_M);
	     				}
	     			}
	     			//Check if a year was skipped
	     			else if(startdate[startdate.length-1]!==year.getFullYear()-1){
	     				startdate.push(Number(startdate[startdate.length-1])+1);
	     				yearPlanned.set(Number(startdate[startdate.length-1])+1, 0);
	     				yearActual.set(Number(startdate[startdate.length-1])+1, 0);
	     			}
	     			else{
	     				startdate.push(Number(year.getFullYear()));
	     				
	     			}
	     		}
	     		else{
	     			//We are at the very first entry so add it to the relevant data structures
	     			var formattedPlanned = (Number(data.Planned_Cost_M)).toFixed(4);
     				var formattedActual = (Number(data.Actual_Cost_M)).toFixed(4);
		     		startdate.push(Number(year.getFullYear()));
		     		yearPlanned.set(Number(year.getFullYear()), Number(formattedPlanned));
		     		yearActual.set(Number(year.getFullYear()), Number(formattedActual));
	     		}
	     	}
	     }
	     	     
	 })
	 .on("end", function(){
	     //console.log("Expenditure-time: done");
	     //Check date range provided and add zeros where needed
	     if(dept!=="All"){
	     	startdate = [];
	     	for(var x=Number(dFrom); x<=Number(dTo); x++){
		     	if(yearPlanned.has(x)){
		     		var finalPlanned = (Number(yearPlanned.get(x))/1000).toFixed(4);
		     		plannedcost.push(Number(finalPlanned));
		     	}
		     	else{
		     		plannedcost.push(0);
		     	}
		     	
		     	if(yearActual.has(x)){
		     		var finalActual = (Number(yearActual.get(x))/1000).toFixed(4);
		     		actualcost.push(Number(finalActual));
		     	}
		     	else{
		     		actualcost.push(0);
		     	}
		     	//Redo the start date because we are done using it as controller
		     	startdate.push(Number(x));
		     }
	     }
	     else{
	     	yearPlanned.forEach(function(value, key){
		     	var finalPlanned = (Number(value)/1000).toFixed(4);
		     	plannedcost.push(Number(finalPlanned));
		     });
		     yearActual.forEach(function(value, key){
		     	var finalActual = (Number(value)/1000).toFixed(4);
		     	actualcost.push(Number(finalActual));
		     });
	     }	     
	     //console.log("Planned: "+plannedcost);
	     return callback(null, {"status" : 1, "years" : startdate, "planned": plannedcost, "actual": actualcost});
	 });

}

module.exports = getExpenditure;