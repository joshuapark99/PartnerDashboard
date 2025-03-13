// Validate test details

const validateTestDetails = (req, res, next) => {
    const { tests } = req.body;

    // Validate that tests is an array of objects with valid data types
    if (!Array.isArray(tests) || tests.length === 0) {
        return res
            .status(400)
            .json({
                message: "Invalid data. Expected an array of test objects.",
            });
    }

    for (const test of tests) {
        // Check if each test object has the required properties
        if (typeof test.name !== "string" || isNaN(test.price)) {
            throw new Error(
                "Invalid test data. Each test should have name (string) and price (number)."
            );
        }
    }

    next();
};

module.exports = validateTestDetails;