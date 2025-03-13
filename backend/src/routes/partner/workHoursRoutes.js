const express = require("express");
const {
    getWorkHours,
    updateWorkHours,
} = require("../../controllers/workHoursController.js");
const validateWorkHourDetails  = require("../../middleware/validators/validateWorkHourDetails.js");
const router = express.Router({mergeParams: true});

router.get("/", getWorkHours);
router.put("/", validateWorkHourDetails, updateWorkHours);

module.exports = router;
