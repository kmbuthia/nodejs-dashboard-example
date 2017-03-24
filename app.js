
var getTotalPrjsRev = require("./scripts/totalprojectsrevenue.js");
var getExpenditure = require("./scripts/expendituretime.js");
var getExpenditureDept = require("./scripts/expendituredept.js");
var getEfficiency = require("./scripts/deptefficiency.js");
var getCompletion = require("./scripts/projectcompletion.js");
var getDepts = require("./scripts/departments.js");

var express   =    require("express");
var bodyparser = require("body-parser");
//var formidable = require("formidable");
var app       =    express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/', function( req, res ) {
  //res.json( [ 'Welcome to Open Data Innovation CW1' ] );
  
});

app.post('/totalprojectsandrevenue', function(req, res){
	var dFrom = req.body.dateFrom;
	var dTo = req.body.dateTo;
	var dept = req.body.department;
	getTotalPrjsRev(dept, dFrom, dTo, function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});

app.post('/expenditure', function(req, res){
	var dFrom = req.body.dateFrom;
	var dTo = req.body.dateTo;
	var dept = req.body.department;
	getExpenditure(dept, dFrom, dTo, function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});

app.post('/expdept', function(req, res){
	var dFrom = req.body.dateFrom;
	var dTo = req.body.dateTo;
	var dept = req.body.department;
	getExpenditureDept(dept, dFrom, dTo, function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});

app.post('/efficiency', function(req, res){
	var dFrom = req.body.dateFrom;
	var dTo = req.body.dateTo;
	var dept = req.body.department;
	getEfficiency(dept, dFrom, dTo, function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});

app.post('/completion', function(req, res){
	var dFrom = req.body.dateFrom;
	var dTo = req.body.dateTo;
	var dept = req.body.department;
	getCompletion(dept, dFrom, dTo, function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});

app.post('/departments', function(req, res){
	getDepts(function(err, results){
		if(err){
			res.json(err);
		}
		else{
			res.json(results);
		}
	});
});


app.listen(3010);