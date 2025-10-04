// server/src/index.ts
import express from "express";
import cors from "cors";
import { yoga } from "./schema";
import { appOpen, register } from "./metrics";

const app = express();
app.use(cors());
app.use(yoga.graphqlEndpoint, yoga); // /graphql

app.use(express.json());

// POST /events { type: "app_open", platform: "android" }
app.post("/events", (req, res) => {
  const { type, platform } = req.body || {};
  if (type === "app_open" && platform) {
    appOpen.inc({ platform });
  }
  res.json({ ok: true });
});

// Prometheus scrape
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on http://localhost:${port}/graphql`);
});
