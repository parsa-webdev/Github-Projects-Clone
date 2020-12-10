const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
require("./helpers/init_mongodb");
require("./helpers/init_redis");
const path = require("path");

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

app.get("/", async (req, res, next) => {
  res.send("Express server");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/app", require("./routes/project"));
app.use("/api/app", require("./routes/tasks"));

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Express server running"));
