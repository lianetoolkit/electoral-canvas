import express from "express";
import bodyParser from "body-parser";
import Redis from "ioredis";
import puppeteer from "puppeteer";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const FILES_DIR = path.join(__dirname, "../files");
const FORMATS = ["A3", "A2"];
const URL = process.env.URL || "http://localhost:8000";
const REDIS = process.env.REDIS || "redis://localhost:6379/electoral-canvas";

let puppeteerConfig = {
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
};

if (process.env.CHROMIUM_PATH) {
  puppeteerConfig.executablePath = process.env.CHROMIUM_PATH;
}

/*
 * First render
 */
if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}
setTimeout(async () => {
  for (const format of FORMATS) {
    await render(null, "default", format);
  }
  console.log("Default PDF rendered");
}, 10000);

const app = express();
const redis = new Redis(REDIS);

redis.on("connect", () => {
  console.log("Connected to redis server");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getCanvasPath = (name, format) => {
  return path.join(FILES_DIR, `canvas-${name}-${format}.pdf`);
};

const render = async function(id, name, format) {
  const pageUrl = id ? URL + "/" + id : URL;
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.goto(pageUrl);
  await page.pdf({
    path: getCanvasPath(id || name, format),
    format,
    scale: 1,
    landscape: true,
    printBackground: true
  });
  await browser.close();
};

const renderCanvas = async function(id, name) {
  for (const format of FORMATS) {
    const exists = await new Promise((resolve, reject) => {
      fs.open(getCanvasPath(id || name, format), "r", (err, fd) => {
        if (err && err.code === "ENOENT") {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    if (!exists) {
      console.log(`Generating ${format} PDF for ${id || name}`);
      await render(id, name, format);
    }
  }
};

const parseFromLiane = function(canvas) {
  let result = { ...canvas };
  if (result.basic_info && result.basic_info.location) {
    result.basic_info.location = result.basic_info.location.city.name;
  }
  if (result.commitments && result.commitments.commitments) {
    result.commitments = result.commitments.commitments.map(c => c.title);
  }
  if (result.causes && result.causes.causes) {
    result.causes = result.causes.causes.map(c => c.title);
  }
  if (result.principles && result.principles.principles) {
    result.principles = result.principles.principles.map(p => p.title);
  }
  if (result.assets && result.assets.assets) {
    result.assets = result.assets.assets.map(p => p.description).join(";\n");
  }
  if (result.network && result.network.competitors) {
    result.competitors = result.network.competitors.map(c => [c.name, c.party]);
  }
  if (result.team && result.team.team) {
    result.team = result.team.team.map(t => [t.name, t.role]);
  }
  if (result.potential_voter && result.potential_voter.profiles) {
    result.electorate = result.potential_voter.profiles.map(profile => {
      return {
        ...profile,
        location: profile.territory ? profile.territory.location.city.name : ""
      };
    });
  }
  return result;
};

app.post("/", (req, res) => {
  // Validate
  if (!req.body.canvas) {
    res.status(500).send("You must provide a canvas object");
  }

  let canvas = req.body.canvas;

  if (req.body.fromLiane) {
    canvas = parseFromLiane(req.body.canvas);
  }

  const hash = crypto
    .createHash("sha1")
    .update(JSON.stringify(canvas))
    .digest("hex");

  const id = hash.substr(0, 7);
  let fromCache = false;

  redis.get(id).then(payload => {
    fromCache = !!payload;
    payload = payload
      ? JSON.parse(payload)
      : {
          id,
          key: hash,
          data: canvas
        };
    if (!fromCache) {
      redis.set(payload.id, JSON.stringify(payload));
    }
    renderCanvas(payload.id)
      .then(() => {
        if (req.body.json) {
          res.send({ id: payload.id });
        } else {
          res.redirect(`/${payload.id}`);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
});

app.get(/^\/(\b[0-9a-f]{5,40}\b)$/, (req, res) => {
  const id = req.params[0];
  redis
    .get(id)
    .then(payload => {
      if (!payload) {
        res.status(404).send("Not Found");
      } else {
        res.send(JSON.parse(payload).data);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default app;
