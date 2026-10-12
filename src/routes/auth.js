const express = require("express");
const mockAuthController = require("../controllers/mockAuthController");

const router = express.Router();

router.post("/signin", mockAuthController.submitSignin);
router.post("/signup", mockAuthController.submitSignup);
router.post("/demo", mockAuthController.enterDemo);

module.exports = router;
