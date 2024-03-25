const express = require("express");
const router = express.Router();
const translaterHistoryController = require("../controllers/translaterHistoryController");

//create history
router.post("/", translaterHistoryController.setTranslaterHistory);

//read all history
router.get("/", translaterHistoryController.getTranslaterHistory);

//read one part
router.get("/:itemid", translaterHistoryController.getOneTranslaterHistory);

// update history
router.patch("/:itemid", translaterHistoryController.updateTranslaterHistory);

//delete one translation
router.delete(
  "/:itemid",
  translaterHistoryController.deleteOneTranslationHistory
);

//all delete
router.delete("/", translaterHistoryController.deleteAllTranslationHistory);

module.exports = router;
