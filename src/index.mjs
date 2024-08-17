import express from "express";
import routes from "./routes/index.mjs";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "exp://192.168.100.6:8081",
  })
);
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(routes);
