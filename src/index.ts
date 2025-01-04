import express from "express";
import { studentRouter } from "./routes/student";

export const app = express();

app.use(express.json());

var hello = true;
console.log(hello);

app.get("/healthcheck", (_, res) => {
  res.json("healthy");
});

app.use("/api/v1", studentRouter);
