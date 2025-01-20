import express from "express";
import { studentRouter } from "./routes/student";
import client from "prom-client";
import { alertRouter } from "./routes/alert";

export const app = express();
app.use(express.json());

const register = new client.Registry();
register.setDefaultLabels({
  app: "studentapp-prometheus-monitoring",
});

client.collectDefaultMetrics({ register });

const httpRequestDurationMicroSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of http requests in microseconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.5, 1, 3, 5, 7, 10],
});

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "code"],
});

const activeRequestsGauge = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

register.registerMetric(httpRequestDurationMicroSeconds);
register.registerMetric(httpRequestsTotal);

app.use((req, res, next) => {
  const startTime = Date.now();
  activeRequestsGauge.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    httpRequestsTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      code: res.statusCode,
    });

    httpRequestDurationMicroSeconds.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration,
    );

    activeRequestsGauge.dec();
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
app.use("/test", alertRouter);
