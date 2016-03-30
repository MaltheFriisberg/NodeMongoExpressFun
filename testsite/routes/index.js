var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/testsite';
	MongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to the server', err);
		} else {
			console.log("Connection Established");

			var collection = db.collection('users');
			//query in the {} braces
			collection.find({}).toArray(function(err, result){
				if(err) {
					res.send(err);
				} else if(result.length) {
					res.send(result);
				} else {
					res.send('no users found');
				}
				db.close();
			});
		}
	});
});

module.exports = router;
