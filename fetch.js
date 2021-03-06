import axios from 'axios';
import { MongoClient } from 'mongodb';
//const MongoClient = require("mongodb").MongoClient;
import assert from 'assert';

// import config file for location of resources
// put your endpoint json URL and mongodb URL here
// use _config.js as template
import config from './config.js';

// axios call to fetch json data
axios.get(config.stationUrl)
	.then(res => {
		// connect to Mongo and send it json data
		connectMongo(res.data);
	})
	.catch(err => {
		console.log(err);
	});

// database name
let dbName = 'weather';

// initiate the mongo client
const client = new MongoClient(config.mongodbUrl);

// function to insert document to mongodb
const insertDocument = (db, data, callback) => {
	// create object of weather station data
	// use office as current station name
	// use json data for temp (F) and humidity (%)
	// included the current data and time
	const stationObj = {
		"station":"office",
		"tempF": data.tempF,
		"humidity": data.humidity,
		"datetime": Date()
	};
	
	// get the database collection named 'station'
	const collection = db.collection('station');
	
	// insert one document
	collection.insertOne(stationObj, (err, res) => {
		if (err) {
			throw err;
		}
		else {
			// callback function, simply return string 'Inserted'
			callback("Inserted");
		}
	});
};

// function to connect to mongodb and call insert with the provided data
const connectMongo = (data) => {
	// using global client, connect to mongodb
	client.connect(err => {
		// check for errors
		assert.equal(null, err);
		
		// get db object from client mongodb
		const db = client.db(dbName);
		
		// call function to insert document record and receive a callback response
		insertDocument(db, data, (res) => {
			console.log(res);
			// close the mongodb client
			client.close();
		});
	});
};