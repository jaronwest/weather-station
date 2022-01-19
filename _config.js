// template for config file
export default {
	// stationUrl is the location of the expected json endpoint
	// it expects an object with properties tempF and humidity
	stationUrl: 'http://endpoint.json',
	// mongodbUrl is the location of the mongodb
	// you can leave this as is if hosting on local server with default port
	mongodbUrl: 'mongodb://localhost:27017'
}