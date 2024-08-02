import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", (req, res) => {
  res.send("User created");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
