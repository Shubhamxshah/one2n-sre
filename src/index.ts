import express from "express";
import { studentRouter } from "./routes/student";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get("/healthcheck", (_, res) => {
  res.json("healthy")
})

app.use("/api/v1", studentRouter)
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
