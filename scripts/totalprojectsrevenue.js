
var csv = require('fast-csv');
var fs = require('fs');

var getTotalProjects = function(dept, dFrom, dTo, callback){
	var stream = fs.createReadStream("./Projects_CW1_Cleaned.csv");
 	
 	var projectcount = [];
 	var totalrevenue = 0;
 	var year;
 	
	csv.fromStream(stream, {headers : true, ignoreEmpty: true})
	 .on("data", function(data){
	     //console.log(data.Actual_Cost_M);
	     if(dept=="All"){
	     	//Now check the date range
	     	year = new Date(data.Start_Date);
	     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	     		//console.log(year.getFullYear());
	     		projectcount.push(data.Project_Name);
	     		totalrevenue += Number(data.Actual_Cost_M);	
	     	}
	     }
	     else if(dept==data.Agency_Name){
	     	year = new Date(data.Start_Date);
	     	if(year.getFullYear()>=dFrom && year.getFullYear()<=dTo){
	     		//console.log(year.getFullYear());
	     		projectcount.push(data.Project_Name);
	     		totalrevenue += Number(data.Actual_Cost_M);	
	     	}
	     }
	     	     
	 })
	 .on("end", function(){
	     //console.log("Projects-revenue: done");
	     var count = projectcount.length;
	     //console.log("Count is: "+count);
	     //console.log("Revenue is: "+totalrevenue);
	     return callback(null, {"status" : 1, "projects" : count, "revenue": Number(totalrevenue.toFixed(2))});
	 });

}

module.exports = getTotalProjects;