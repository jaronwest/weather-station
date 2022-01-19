const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

let stationUrl = "http://192.168.1.126";

axios.get(stationUrl)
	.then(res => {
		console.log(res.data);
		connectMongo(res.data);
	})
	.catch(err => {
		console.log(err);
	});

let mongoUrl = "mongodb://localhost:27017";
let dbName = 'weather';

const client = new MongoClient(mongoUrl);

const insertDocument = (db, data, callback) => {
	stationObj = {
		"station":"office",
		"tempF": data.tempF,
		"humidity": data.humidity,
		"datetime": Date()
	};
	
	const collection = db.collection('station');
	
	collection.insertOne(stationObj, (err, res) => {
		if (err) {
			throw err;
		}
		else {
			callback("Inserted");
		}
	});
};

const connectMongo = (data) => {
	client.connect(err => {
		assert.equal(null, err);
		console.log("connected to mongodb");
		
		const db = client.db(dbName);
		
		insertDocument(db, data, (res) => {
			console.log(res);
			client.close();
		});
	});
};