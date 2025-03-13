// validate partner details and ensure they are the correct data types

const validatePartnerDetails = (req, res, next) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (
        typeof name !== "string" ||
        typeof address !== "string"
    ) {
        return res.status(400).json({ error: "Invalid data types" });
    }

    next();
};

module.exports = validatePartnerDetails;
