const axios = require("axios");

axios.post("http://localhost:3000/api/generate", {
	"messages": [
		{ "role": "user", "content": "Hello, how are you?" }
	]
}, {
	"headers": {
		"Content-Type": "application/json"
	}
}).then((response) => {
	console.log(response.data);
}).catch((error) => {
	console.error(error);
});