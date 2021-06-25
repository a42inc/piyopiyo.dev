const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.runEvery1Min = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
	functions.logger.info("Run every 1 minute", {structuredData: true});
	return null;
});

if (process.env.FUNCTIONS_EMULATOR === 'true') {
	const { PubSub } = require("@google-cloud/pubsub");
	const pubsub = new PubSub({  projectId: process.env.GCLOUD_PROJECT });
	exports.execRunEvery1Min = functions.https.onRequest(async (request, response) => {
		const msgId = await pubsub.topic('firebase-schedule-runEvery1Min').publishJSON({});
		response.send(msgId);
	});
}
