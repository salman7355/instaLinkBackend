import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(routes);
