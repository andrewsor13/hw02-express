const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "succes",
    code: 200,
    data: "Server is ok",
  });
  next();
});

router.get("/contacts", async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la preluarea contactelor",
    });
  }
});

module.exports = router;
