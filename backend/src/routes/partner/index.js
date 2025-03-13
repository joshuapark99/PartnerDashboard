const express = require("express");
const router = express.Router();

const validatePartnerId = require("../../middleware/validators/validatePartnerId.js");

// Import test and work hours routes
const testRoutes = require("./testRoutes.js");
const workHoursRoutes = require("./workHoursRoutes.js");
const appointmentRoutes = require("./appointmentRoutes.js");
const partnerRoutes = require("./partnerRoutes.js");

// Define the nested routes for tests and work hours under /partner/:partner_id
router.use("/:partner_id/tests", validatePartnerId, testRoutes); // /partner/:partner_id/tests
router.use("/:partner_id/work-hours", validatePartnerId, workHoursRoutes); // /partner/:partner_id/work-hours
router.use("/:partner_id/appointments", validatePartnerId, appointmentRoutes); // /partner/:partner_id/appointments
router.use("/:partner_id", validatePartnerId, partnerRoutes); // /partner/:partner_id

module.exports = router;
