import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { User } from "./models/User";
config();

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  User.create({ email: "mail@mail.com" })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  res.json({
    message: "hello",
  });
});

const PORT = (process.env.PORT || 5000) as number;

app.listen(PORT, () => console.log("port 5000"));
