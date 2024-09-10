import express from "express";

interface itemTypes {
  id: string;
  body: string;
  isFinished: boolean;
  createdAt: Date;
}

interface dataTypes {
  items: itemTypes[];
}

const data: dataTypes = {
  items: [],
};

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.get("/api", (_req, res) => {
  res.send(data);
});

app.post("/api/post", (req, res) => {
  data.items.push(req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
