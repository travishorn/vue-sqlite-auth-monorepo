require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = {
  user: require("./routes/user"),
};

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json());

app.use("/user", routes.user);

app.listen(port, () => {
  console.log(`Auth server listening at http://localhost:${port}.`);
});
