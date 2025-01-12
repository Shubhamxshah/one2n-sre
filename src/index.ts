import express from "express";
import { studentRouter } from "./routes/student";
import promClient from "prom-client";

export const app = express();
app.use(express.json());

// Create and configure Registry
const register = new promClient.Registry();
register.setDefaultLabels({
  app: "express-prometheus-monitoring",
});

// Enable default metrics collection (includes CPU usage)
promClient.collectDefaultMetrics({
  register,
  prefix: "node_",
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

// HTTP request duration histogram
const httpRequestDurationMicroSeconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of http requests in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

// Request counter for request rate
const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "code"],
});

// CPU Usage gauge (in addition to default metrics)
const cpuUsageGauge = new promClient.Gauge({
  name: "process_cpu_usage",
  help: "Process CPU usage percentage",
});

// Register all metrics
register.registerMetric(httpRequestDurationMicroSeconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(cpuUsageGauge);

// Update CPU usage every 5 seconds
setInterval(() => {
  const startUsage = process.cpuUsage();
  setTimeout(() => {
    const endUsage = process.cpuUsage(startUsage);
    const userCPUUsage = endUsage.user / 1000000; // Convert to seconds
    const systemCPUUsage = endUsage.system / 1000000;
    cpuUsageGauge.set((userCPUUsage + systemCPUUsage) * 100);
  }, 100);
}, 5000);

// Middleware to track metrics
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    // Duration tracking
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    const statusCode = res.statusCode.toString();
    const route = req.route ? req.route.path : req.path;

    // Record duration
    httpRequestDurationMicroSeconds
      .labels(req.method, route, statusCode)
      .observe(durationInSeconds);

    // Increment request counter
    httpRequestsTotal.labels(req.method, route, statusCode).inc();
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
