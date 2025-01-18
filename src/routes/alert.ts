import { Router } from "express";

export const alertRouter = Router();

alertRouter.get("/latency", async (_, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.json({ message: "delayed response" });
});

alertRouter.get("/errors", (_, res) => {
  res.status(500).json({ error: "test error" });
});
