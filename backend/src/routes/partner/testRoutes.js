const express = require("express");
const {
    getTests,
    updateTests,
} = require("../../controllers/testController.js");
const validateTestDetails = require("../../middleware/validators/validateTestDetails.js");
const router = express.Router({mergeParams: true});

router.get("/", getTests);
router.put("/", validateTestDetails, updateTests);

module.exports = router;
