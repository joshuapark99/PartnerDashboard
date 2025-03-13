const validatePartnerId = (req, res, next) => {
    const { partner_id } = req.params;

    if (!partner_id || isNaN(partner_id)) {
        return res.status(400).json({ error: "Invalid partner_id" });
    }

    next();
};

module.exports = validatePartnerId;
