import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const TARGET_DIR = path.resolve("./public/images/official");

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGES_TO_SYNC = [
  {
    name: "sri-aurobindo.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Sri_aurobindo.jpg",
  },
  {
    name: "society.jpg",
    url: "https://sas.edu.in/assets/images/about/society.jpg",
  },
  {
    name: "cm.jpg",
    url: "https://sas.edu.in/assets/images/about/cm.jpg",
  },
  {
    name: "vm.jpg",
    url: "https://sas.edu.in/assets/images/about/vm.jpg",
  },
  {
    name: "admissions.jpg",
    url: "https://sas.edu.in/assets/images/about/admissions.jpg",
  },
  {
    name: "affiliation.jpg",
    url: "https://sas.edu.in/assets/images/about/affiliation.jpg",
  },
  {
    name: "curriculum.jpg",
    url: "https://sas.edu.in/assets/images/about/curriculum.jpg",
  },
  {
    name: "method.jpg",
    url: "https://sas.edu.in/assets/images/about/method.jpg",
  },
  {
    name: "event-01.jpg",
    url: "https://sas.edu.in/assets/images/event/01.jpg",
  },
  {
    name: "logo.png",
    url: "https://sas.edu.in/assets/images/logo.png",
  },
  {
    name: "ll2.png",
    url: "https://sas.edu.in/assets/images/ll2.png",
  },
];

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith("https") ? https : http;
      const req = client.get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
          rejectUnauthorized: false,
          timeout: 10000,
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return downloadFile(res.headers.location, destPath).then(resolve);
          }
          if (res.statusCode !== 200) {
            console.warn(`[SKIP] HTTP ${res.statusCode} for ${url}`);
            return resolve(false);
          }
          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`[OK] Saved ${path.basename(destPath)} (${fs.statSync(destPath).size} bytes)`);
            resolve(true);
          });
          fileStream.on("error", (err) => {
            console.error(`[ERROR] File stream error for ${url}:`, err.message);
            resolve(false);
          });
        }
      );
      req.on("error", (err) => {
        console.warn(`[WARN] Network error fetching ${url}:`, err.message);
        resolve(false);
      });
      req.on("timeout", () => {
        req.destroy();
        console.warn(`[TIMEOUT] Request timed out for ${url}`);
        resolve(false);
      });
    } catch (e) {
      console.error(`[FAIL] ${url}:`, e.message);
      resolve(false);
    }
  });
}

async function main() {
  console.log("=== Syncing Official Sri Aurobindo School Images ===");
  for (const item of IMAGES_TO_SYNC) {
    const dest = path.join(TARGET_DIR, item.name);
    console.log(`Fetching: ${item.name} from ${item.url}...`);
    await downloadFile(item.url, dest);
  }
  console.log("=== Official image sync process complete ===");
}

main();
