const pool = require("../config/db");

const getTests = async (req, res) => {
    const { partner_id } = req.params;
    const result = await pool.query(
        "SELECT * FROM tests WHERE partner_id = $1",
        [partner_id]
    );

    // normalize
    returnJSON = result.rows.map((test) => {
        return {
            id: test.id,
            name: test.name,
            price: parseFloat(test.price),
        };
    });
    res.status(200).json(returnJSON);
};

const updateTests = async (req, res) => {
    const { tests } = req.body;
    const { partner_id } = req.params;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // start transaction

        const result = await client.query(
            "SELECT * FROM tests WHERE partner_id = $1",
            [partner_id]
        );

        const dbTests = result.rows;
        console.log(tests)
        console.log(dbTests)
        // Compare the ids of the stored tests and the new tests
        const dbTestIds = dbTests.map((test) => test.id);
        const newTestIds = tests.map((test) => test.id);

        console.log(dbTestIds)
        console.log(newTestIds)
        // Update the tests that are already in the database
        for (const newTest of tests) {

            if (dbTestIds.includes(newTest.id)) {
                console.log("updating")
                const dbTest = dbTests.find((test) => test.id === newTest.id);

                if (
                    dbTest.name !== newTest.name ||
                    dbTest.price !== newTest.price
                ) {
                    await client.query(
                        `UPDATE tests SET name = $1, price = $2 WHERE id = $3`,
                        [newTest.name, newTest.price, newTest.id]
                    );
                }
            }
        }

        // Insert any new tests
        for (const newTest of tests) {

            if (!newTest.id) {
                console.log("inserting a test")
                await client.query(
                    `INSERT INTO tests (partner_id, name, price) VALUES ($1, $2, $3)`,
                    [newTest.partner_id, newTest.name, newTest.price]
                );
            }
        }

        // Delete any tests that are no longer in the newTests list
        for (const dbTest of dbTests) {
            if (!newTestIds.includes(dbTest.id)) {
                // If the test is no longer in the newTests list, delete it

                await client.query(`DELETE FROM tests WHERE id = $1`, [
                    dbTest.id,
                ]);
            }
        }

        await client.query("COMMIT"); // commit transaction'
        console.log("fully updated successflly")
        res.status(200).json({ message: "Tests updated successfully" });
    } catch (error) {
        await client.query("ROLLBACK"); // rollback transaction
        // res.status(500).json({
        //     message: "An error occurred while updating tests",
        //     error: error.message,
        // });]\
        console.log(error)
        console.log("it failed for some reason")
        console.log(await pool.query(`SELECT * FROM tests WHERE partner_id = $1`))
        res.status(500).json(error);
    } finally {
        console.log('released')
        client.release(); // release client
    }
};

module.exports = { getTests, updateTests };
