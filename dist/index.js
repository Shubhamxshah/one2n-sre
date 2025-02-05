"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const student_1 = require("./routes/student");
const prom_client_1 = __importDefault(require("prom-client"));
const alert_1 = require("./routes/alert");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const register = new prom_client_1.default.Registry();
register.setDefaultLabels({
    app: "studentapp-prometheus-monitoring",
});
prom_client_1.default.collectDefaultMetrics({ register });
const httpRequestDurationMicroSeconds = new prom_client_1.default.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of http requests in microseconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 0.5, 1, 3, 5, 7, 10],
});
const httpRequestsTotal = new prom_client_1.default.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "code"],
});
const activeRequestsGauge = new prom_client_1.default.Gauge({
    name: "active_requests",
    help: "Number of active requests",
});
register.registerMetric(httpRequestDurationMicroSeconds);
register.registerMetric(httpRequestsTotal);
exports.app.use((req, res, next) => {
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
        httpRequestDurationMicroSeconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode,
        }, duration);
        activeRequestsGauge.dec();
    });
    next();
});
exports.app.get("/healthcheck", (_, res) => {
    res.json("healthy");
});
exports.app.get("/metrics", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.set("content-type", register.contentType);
        res.end(yield register.metrics());
    }
    catch (err) {
        res.status(500).end(err);
    }
}));
exports.app.use("/api/v1", student_1.studentRouter);
exports.app.use("/test", alert_1.alertRouter);
