const fs = require("fs"); const data = JSON.parse(fs.readFileSync("./scraped-data-with-images.json", "utf8")); console.log("Creating export for", data.pages.length, "pages");
