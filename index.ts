import express from "express";
import { v4 as uuidv4 } from "uuid";

interface IitemTypes {
  id: string;
  body: string;
  isFinished: boolean;
  createdAt: number;
}

interface IdataTypes {
  items: IitemTypes[];
}

const data: IdataTypes = {
  items: [],
};

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.get("/api", (_req, res) => {
  res.send(data);
});

app.post("/api", (req, res) => {
  const item: IitemTypes = {
    id: uuidv4(),
    body: req.body.body,
    isFinished: req.body.isFinished,
    createdAt: Date.now(),
  };

  data.items.push(item);
  res.send(item);
  res.status(200).end();
});

app.delete("/api/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  if (data.items.find((item) => item.id === itemId)) {
    const filteredItems = data.items.filter((item) => item.id !== itemId);

    data.items = [...filteredItems];

    res.send("item deleted");
    res.status(200).end();
  } else {
    res.send(`Item with ID ${itemId} does not exist`);
    res.status(404).end();
  }
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
