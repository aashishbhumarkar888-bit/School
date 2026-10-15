import fs from "fs";
import https from "https";

const dest = "./public/images/official/sri-aurobindo.jpg";
const file = fs.createWriteStream(dest);

https.get(
  "https://upload.wikimedia.org/wikipedia/commons/7/71/Sri_aurobindo.jpg",
  {
    headers: {
      "User-Agent": "SriAurobindoSchoolBhopalPortal/1.0 (https://sas.edu.in; aurobhopal@gmail.com)",
      Accept: "image/jpeg,image/*,*/*",
    },
  },
  (res) => {
    if (res.statusCode === 200) {
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Successfully saved sri-aurobindo.jpg:", fs.statSync(dest).size, "bytes");
      });
    } else {
      console.log("HTTP status:", res.statusCode);
      // In case Wikimedia rate limits, we create a fallback image or copy
    }
  }
).on("error", (err) => {
  console.error("Error:", err.message);
});
