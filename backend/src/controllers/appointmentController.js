const pool = require("../config/db");

// The appointment entries will be deleted if the partner or test is deleted
const getAppointments = async (req, res) => {
    const { partner_id } = req.params; // Extract partnerId from the URL parameter

    const client = await pool.connect();

    try {
        // get appointments for the specific partner_id
        const result = await client.query(
            "SELECT * FROM appointments WHERE partner_id = $1 ORDER BY appointment_time DESC",
            [partner_id]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({error: "An error occurred while updating the partner"});
    } finally {
        client.release();
    }
};
module.exports = { getAppointments };
