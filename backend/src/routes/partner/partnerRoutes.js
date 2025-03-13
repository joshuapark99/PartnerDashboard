const express = require("express");
const {
    getPartner,
    updatePartner,
} = require("../../controllers/partnerController.js");
const validatePartnerDetails = require("../../middleware/validators/validatePartnerDetails.js");
const router = express.Router({mergeParams: true});

router.get("/", getPartner);
router.put("/", validatePartnerDetails, updatePartner);

module.exports = router;
