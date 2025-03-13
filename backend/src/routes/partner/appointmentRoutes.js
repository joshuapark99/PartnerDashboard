const express = require("express");
const {
    getAppointments,
} = require("../../controllers/appointmentController.js");
const router = express.Router({mergeParams: true});

router.get("/", getAppointments);

module.exports = router;
