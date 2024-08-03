import express from "express";
import routes from "./routes/index.mjs";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(routes);
