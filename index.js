const express = require("express");

const axios = require("axios");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

let data = {};

app.post("/api/generate", async (req, res) => {
	const ip = req.ip;
	
	// check if the IP has made a request in the last 10 seconds
	if (data[ip] && Date.now() - data[ip] < 10000 && ip != "::ffff:127.0.0.1") {
		console.log(ip);
		res.status(429).end("Too many requests. Try again in 10 or less seconds.");
		return;
	}

	const messages = req.body.messages;

	if (!messages) {
		res.status(400).end("No messages provided.");
		return;
	}

	// request ollama without streaming
	const response = await axios.post("http://localhost:11434/api/generate", {
		model: "llama3.2:3b-instruct-q4_0",
		prompt: messages[0].content,
		stream: false,
	});

	// update the last request time for the IP
	data[ip] = Date.now();

	res.end(response.data.response);
});

app.listen(3000, () => {
	console.log("ready on", 3000);
});
