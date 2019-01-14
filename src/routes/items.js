const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.post("/lists/:listId/items/create",
  helper.ensureAuthenticated,
  validation.validateItems,
  itemController.create);
router.post("/lists/:listId/items/:id/destroy", helper.ensureAuthenticated, itemController.destroy);
router.get("/lists/:listId/items", helper.ensureAuthenticated, itemController.getAllItems);
router.post("/lists/:listId/items/:id/update", helper.ensureAuthenticated, validation.validateItems, itemController.update);

module.exports = router;
