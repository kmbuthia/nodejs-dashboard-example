
var csv = require('fast-csv');
var fs = require('fs');
var Hashmap = require('hashmap');

var getCompletion = function(dept, dFrom, dTo, callback){

	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
	
	var year;
	var schedules = [];
	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	 	if(dept=="All"){
	 		//Now check the date range
	 		year = new Date(data.Start_Date);
	 		if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	 			schedules.push(Number(data.Schedule_Variance_in_days));
	 		}
	 	}
	 	else if(dept==data.Agency_Name){
	 		//Now check the date range
	 		year = new Date(data.Start_Date);
	 		if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	 			schedules.push(Number(data.Schedule_Variance_in_days));
	 		}
	 	}
	})
	.on("end", function(){
	     //console.log("Project-completion: done");
	     completedOnTime = 0;
	     completedLate = 0;
	     completedEarly = 0;
	     schedules.forEach(function(value, key){
	     	if(Number(value)>0){
	     		completedLate += 1;
	     	}
	     	else if(Number(value)<0){
	     		completedEarly += 1;
	     	}
	     	else if(Number(value)==0){
	     		completedOnTime += 1;
	     	}
	     });
	     return callback(null, {"status" : 1, "early" : completedEarly, "late": completedLate, "onTime": completedOnTime, "total": schedules.length});
	});	
	
}

module.exports = getCompletion;