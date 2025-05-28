const fs = require("fs");
console.log("🚀 Startar komplett export...");
const data = JSON.parse(fs.readFileSync("./scraped-data-with-images.json", "utf8"));
console.log("📄 Laddat", data.pages.length, "sidor med", data.metadata.totalImages, "bilder");
let html = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Flex HRM</title><style>body{font-family:Arial,sans-serif;line-height:1.6;max-width:800px;margin:0 auto;padding:20px;}h1{color:#2c3e50;}h2{color:#34495e;margin-top:30px;}img{max-width:100%;margin:15px 0;}</style></head><body><h1>Flex HRM Dokumentation</h1>";
html += "<p>Totalt: " + data.pages.length + " sidor med " + data.metadata.totalImages + " bilder</p>";
for (let i = 0; i < data.pages.length; i++) { const page = data.pages[i]; if (i % 20 === 0) console.log("📝 Sida", i + 1); html += "<h2>" + page.title + "</h2>"; if (page.breadcrumbs) html += "<p><em>" + page.breadcrumbs + "</em></p>"; const paragraphs = page.content.split("\n").filter(p => p.trim()); for (const p of paragraphs) { if (p.trim()) html += "<p>" + p.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</p>"; } }
html += "</body></html>"; const fileName = "flex-hrm-complete-" + new Date().toISOString().split("T")[0] + ".html"; fs.writeFileSync(fileName, html); console.log("✅ Komplett HTML skapat:", fileName); console.log("📊 Storlek:", (html.length / 1024 / 1024).toFixed(2), "MB");
