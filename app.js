const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const corsOptions = require("./cors");
const routerApi = require("./routes/index.js");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.use(cors(corsOptions));

app.use(morgan("tiny"));

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Ruta nu exista",
    data: "Not fount!",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal server error!",
  });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB is running.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Serverul nu ruleaza. ${err.message}`);
  });
