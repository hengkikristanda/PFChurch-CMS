const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static HTML files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/sidebarMenu", (req, res) => {
	// Read the JSON file from the server
	fs.readFile("src/data/sidebar-list-menu.json", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error reading JSON file");
			return;
		}
		// Send the JSON data as a response
		res.json(JSON.parse(data));
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
