
var csv = require('fast-csv');
var fs = require('fs');
var Hashmap = require('hashmap');

var getExpenditureDept = function(dept, dFrom, dTo, callback){
	
	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
	
	var deptPrjs = new Hashmap();
	var deptBudget = new Hashmap();
	var year;
	var sumPrjs = [];
	var sumBudget = [];
	var allDepts = [];
	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	 	if(dept=="All"){
		     	//Now check the date range
		     	year = new Date(data.Start_Date);
		     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
		     		//Summing up projects
		     		if(deptPrjs.has(data.Agency_Name)){
	 				var currentCount = Number(deptPrjs.get(data.Agency_Name));
	 				deptPrjs.set(data.Agency_Name, currentCount+1);
	 			}
	 			else{
	 				deptPrjs.set(data.Agency_Name, 1);
	 			}
	 			//Summing up budget
	 			if(deptBudget.has(data.Agency_Name)){
	 				var cost = data.Actual_Cost_M;
	 				if(cost.length>0){
	 					var currentCount = deptBudget.get(data.Agency_Name);
		 				var sum = Number(cost).toFixed(3);
		 				var finalVal = Number(currentCount)+Number(sum);
		 				//console.log("Final val: "+Number(finalVal).toFixed(3));
		 				deptBudget.set(data.Agency_Name, Number(finalVal).toFixed(3));
	 				}
	 			}
	 			else{
	 				var cost = data.Actual_Cost_M;
	 				if(cost.length>0){
	 					var sum = Number(cost).toFixed(3);
		 				//console.log("Adding: "+sum);
		 				deptBudget.set(data.Agency_Name, sum);
	 				}
	 			}
		     	}
	     	}
	     	else if(dept==data.Agency_Name){
	     		//Now check the date range
		     	year = new Date(data.Start_Date);
		     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
		     		//Summing up projects
		     		if(deptPrjs.has(data.Agency_Name)){
	 				var currentCount = Number(deptPrjs.get(data.Agency_Name));
	 				deptPrjs.set(data.Agency_Name, currentCount+1);
	 			}
	 			else{
	 				deptPrjs.set(data.Agency_Name, 1);
	 			}
	 			//Summing up budget
	 			if(deptBudget.has(data.Agency_Name)){
	 				var cost = data.Actual_Cost_M;
	 				if(cost.length>0){
	 					var currentCount = deptBudget.get(data.Agency_Name);
		 				var sum = Number(cost).toFixed(3);
		 				var finalVal = Number(currentCount)+Number(sum);
		 				//console.log("Final val: "+Number(finalVal).toFixed(3));
		 				deptBudget.set(data.Agency_Name, Number(finalVal).toFixed(3));
	 				}
	 			}
	 			else{
	 				var cost = data.Actual_Cost_M;
	 				if(cost.length>0){
	 					var sum = Number(cost).toFixed(3);
		 				//console.log("Adding: "+sum);
		 				deptBudget.set(data.Agency_Name, sum);
	 				}
	 			}
		     	}
	     	}
	 
	 })
	 .on("end", function(){
	     //console.log("Expenditure-dept: done");
	     deptPrjs.forEach(function(value, key) {
		sumPrjs.push(value);
		allDepts.push(key);
	     });
	     deptBudget.forEach(function(value, key){
	     	var formattedValue = (Number(value)/1000).toFixed(3);
	     	//console.log("Value: "+formattedValue);
	     	sumBudget.push(Number(formattedValue));
	     });
	     return callback(null, {"status" : 1, "departments" : allDepts, "projectsums": sumPrjs, "budgetsums": sumBudget});
	 });

}

module.exports = getExpenditureDept;