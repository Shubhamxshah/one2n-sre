import express from "express";
import { studentRouter } from "./routes/student";
import promClient from "prom-client";

export const app = express();
app.use(express.json());

const register = new promClient.Registry();

register.setDefaultLabels({
  app: "express-prometheus-monitoring",
});

promClient.collectDefaultMetrics({ register });

const httpRequestDurationMicroSeconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of http requests in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

register.registerMetric(httpRequestDurationMicroSeconds);

app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;

    const statuscode = res.statusCode.toString();
    httpRequestDurationMicroSeconds
      .labels(req.method, req.route ? req.route.path : req.path, statuscode)
      .observe(durationInSeconds);
  });

  next();
});

app.get("/healthcheck", (_, res) => {
  res.json("healthy");
});

app.get("/metrics", async (_, res) => {
  try {
    res.set("content-type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use("/api/v1", studentRouter);
