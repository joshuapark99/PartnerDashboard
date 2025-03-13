const pool = require("../config/db");

const getPartner = async (req, res) => {
    const { partner_id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM partner WHERE id = $1", [
            partner_id,
        ]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching the partner",
        });
    }
};

const updatePartner = async (req, res) => {
    const { partner_id } = req.params;
    const { name, address } = req.body;

    try {
        await pool.query(
            "UPDATE partner SET name = $2, address = $3 WHERE id = $1",
            [partner_id, name, address]
        );
        res.status(200).json({ message: "Partner updated successfully" });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the partner",
        });
    }
};

module.exports = { getPartner, updatePartner };
