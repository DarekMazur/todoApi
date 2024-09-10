import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import cors from "cors";

interface IitemTypes {
  id: string;
  body: string;
  isFinished: boolean;
  createdAt: number;
}

interface IdataTypes {
  items: IitemTypes[];
}

const app = express();
const port = process.env.PORT || 9000;

const corsOptions = {
  origin: "*", // update to match the domain you will make the request from
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const readDataFromFile = fs.readFileSync("db.json");

const data: IdataTypes = JSON.parse(readDataFromFile.toString());

app.get("/", (_req, res) => {
  res.send("Server is running");
});

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

  fs.writeFile("db.json", JSON.stringify(data, null, 2), () => {
    res.send(item);
    res.status(200).end();
  });
});

app.delete("/api/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  if (data.items.find((item) => item.id === itemId)) {
    const filteredItems = data.items.filter((item) => item.id !== itemId);

    data.items = [...filteredItems];

    fs.writeFile("db.json", JSON.stringify(data, null, 2), () => {
      res.send("item deleted");
      res.status(200).end();
    });
  } else {
    res.send(`Item with ID ${itemId} does not exist`);
    res.status(404).end();
  }
});

app.patch("/api/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const itemToUpdate = data.items.find((item) => item.id === itemId);

  if (itemToUpdate) {
    if (req.body.body !== undefined) {
      itemToUpdate.body = req.body.body;
    }

    if (req.body.isFinished !== undefined) {
      itemToUpdate.isFinished = req.body.isFinished;
    }

    fs.writeFile("db.json", JSON.stringify(data, null, 2), () => {
      res.send(`Item with ID ${itemId} updated sucessfully!`);
      res.status(200).end();
    });
  } else {
    res.send(`Item with ID ${itemId} does not exist`);
    res.status(404).end();
  }
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
