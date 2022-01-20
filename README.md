# weather-station
Node.js service to collect data from a remote weather station endpoint providing json data of current weather.

This service was built on version 16.13.2 of node and running with version 5.0.5 of mongo database.

Dependencies include axios for getting data from remote weather station endpoint, and mongodb for inserting records to the database.

Endpoint should deliver json in the format of:
{
  "tempF": "69",
  "humidity": "99"
}

When inserting a mongodb document, it will include the datetime and a station name (currently hardcoded to "office").

To configure the URL of the weather station endpoint and the mongodb URL, change the name of file _config.js to config.js and update the value of properties exported.
