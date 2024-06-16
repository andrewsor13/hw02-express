const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/contacts", controller.get);
router.post("/contacts", controller.create);
router.delete("/contacts/:id", controller.deleteData);
router.patch("/contacts/:id", controller.update);

module.exports = router;
