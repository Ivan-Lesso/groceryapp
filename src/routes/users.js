const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");
const helper = require("../auth/helpers");

router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);

module.exports = router;
