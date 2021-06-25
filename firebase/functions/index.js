const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.runEvery1Min = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
	functions.logger.info("Run every 1 minute", {structuredData: true});
	return null;
});
