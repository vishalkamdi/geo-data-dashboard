const fs = require("fs");

const data = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  projectName: `Project ${i + 1}`,
  latitude: 20 + Math.random() * 10,
  longitude: 70 + Math.random() * 10,
  status: i % 3 === 0 ? "Inactive" : "Active",
  lastUpdated: new Date(Date.now() - Math.random() * 10000000000)
    .toISOString()
    .split("T")[0],
}));

fs.writeFileSync("./src/data/mockData.json", JSON.stringify(data, null, 2));

console.log("✅ 5000+ records generated");
