const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const stream = require('express-stream');

const listController = require("../controllers/listController");
const validation = require("./validation");

router.get("/lists", helper.ensureAuthenticated, listController.index);
router.get("/lists/new", helper.ensureAuthenticated, listController.new);
router.post("/lists/create", helper.ensureAuthenticated, validation.validateLists, listController.create);
router.get("/lists/:id", helper.ensureAuthenticated, listController.show);
router.post("/lists/:id/destroy", helper.ensureAuthenticated, listController.destroy);
router.get("/lists/:id/edit", helper.ensureAuthenticated, listController.edit);
router.post("/lists/:id/update", helper.ensureAuthenticated, validation.validateLists, listController.update);

module.exports = router;
