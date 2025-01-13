import { app } from ".";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
