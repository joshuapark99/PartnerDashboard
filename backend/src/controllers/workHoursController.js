const pool = require("../config/db");

const getWorkHours = async (req, res) => {
    const { partner_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT day_of_week, start_time, end_time 
            FROM work_hours 
            WHERE partner_id = $1`,
            [partner_id]
        );

        // Organize data into a structured format (group by day)
        const workHoursByDay = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
        };
        result.rows.forEach(({ day_of_week, start_time, end_time }) => {
            const day = day_of_week; // 0-6 representing Sun-Sat
            workHoursByDay[day].push({ start_time, end_time });
        });

        res.json(workHoursByDay);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const updateWorkHours = async (req, res) => {
    const { partner_id } = req.params;
    const { workHours } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // start transaction

        // Delete existing work hours
        await client.query(
            "DELETE FROM work_hours WHERE partner_id = $1",
            [partner_id]
        );

        const insertQuery = `
            INSERT INTO work_hours (partner_id, day_of_week, start_time, end_time)
            VALUES ($1, $2, $3, $4)
        `;

        const keys = Object.keys(workHours);
        for (const key of keys) {
            const day = parseInt(key);
            for (const { start_time, end_time } of workHours[key]) {
                await client.query(insertQuery, [
                    partner_id,
                    day,
                    start_time,
                    end_time,
                ]);
            }
        }

        await client.query("COMMIT"); // commit transaction
        res.status(200).json({ message: "Work hours updated successfully." });
    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: "Failed to update work hours." });
    } finally {
        client.release();
    }
};

module.exports = { getWorkHours, updateWorkHours };
