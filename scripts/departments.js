
var csv = require('fast-csv');
var fs = require('fs');

var getDepartments = function(callback){

	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
	
	var checkDepts = [];
	var count = 0;
	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	 	if(checkDepts.length>0){
	 		if(Number(checkDepts.indexOf(data.Agency_Name))==-1){
		 		checkDepts.push(data.Agency_Name);
		 	}
	 	}
	 	else{
	 		checkDepts.push("All");
	 		checkDepts.push(data.Agency_Name);
	 	}	 
	 })
	 .on("end", function(){
	     //console.log("Departments: done");
	     //console.log("Depts: "+depts);
	     return callback(null, {"status" : 1, "departments" : checkDepts});
	 });
	
}

module.exports = getDepartments;