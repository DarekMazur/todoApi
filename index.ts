import express from "express";

const data = {
  items: [],
};

const app = express();
const port = process.env.PORT || 9000;

app.get("/api", (_req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
