
var csv = require('fast-csv');
var fs = require('fs');
var Hashmap = require('hashmap');

var getEfficiency = function(dept, dFrom, dTo, callback){

	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
	var sumVariance = new Hashmap();
	
	varPositives = [];
	varNegatives = [];
	varDepts = [];
	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	 	if(dept=="All"){
	 		//Now check the date range
		     	year = new Date(data.Start_Date);
		     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
		     		var costVar = data.Cost_Variance_M;
	     			if(costVar.length>0){
	     				if(Number(costVar)>0){
	     					varPositives.push(Number(costVar));
	     				}
	     				else if(Number(costVar)<0){
	     					varNegatives.push(Number(costVar));
	     				}
	     			}
		     	}
	 	}
	 	else if(dept==data.Agency_Name){
	 		//Now check the date range
		     	year = new Date(data.Start_Date);
		     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
		     		var costVar = data.Cost_Variance_M;
	     			if(costVar.length>0){
	     				if(Number(costVar)>0){
	     					varPositives.push(Number(costVar));
	     				}
	     				else if(Number(costVar)<0){
	     					varNegatives.push(Number(costVar));
	     				}
	     			}
		     	}
	 	}
	 })
	 .on("end", function(){
	     //console.log("Dept-efficiency: done");
	     if(varPositives.length>0){
	     	var tempPos = (varPositives.reduce(getSum)/1000).toFixed(4);
	     	varPositives = [];
	     	
	     	var myListP = [];
		myListP.push("Total spent over budget");
		myListP.push(Number(tempPos));
		varPositives.push(myListP);
	     }
	     else{
	     	var myListP = [];
		myListP.push("No data");
		myListP.push(0);
		varPositives.push(myListP);
	     }
	     
	     if(varNegatives.length>0){
	     	var tempNeg = (varNegatives.reduce(getSum)/1000).toFixed(4);
		varNegatives = [];
		     	
		var myListN = [];
		myListN.push("Total spent under budget");
		myListN.push(-Number(tempNeg));
		varPositives.push(myListN);
	     }
	     else{
	     	var myListN = [];
		myListN.push("No data");
		myListN.push(0);
		varPositives.push(myListN);
	     }
	     //Now we sort the arrays
	     //varArray.sort(function(a, b){return b-a});
	     //console.log(varPositives);
	     //console.log(varNegatives);
	     return callback(null, {"status" : 1, "departments" : varDepts, "positiveVars": varPositives});
	 });	
}

function getSum(total, num) {
    return total + num;
}


module.exports = getEfficiency;