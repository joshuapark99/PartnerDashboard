const isValidTimeFormat = (time) => {
    // Regular expression to match time in the format HH:mm:ss
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    return timePattern.test(time);
}


// Validate workhours Details
const validateWorkHourDetails = (req, res, next) => {
    const { workHours } = req.body;

    // validate that the workHours is an object
    if (typeof workHours !== "object" || Array.isArray(workHours)) {
        return res.status(400).json({error: "Invalid format. Expected an object."});
    }

    // Check that object has exactly 7 keys
    const keys = Object.keys(workHours);
    if(keys.length !== 7) {
        return res.status(400).json({error: "Invalid format. Expected 7 keys."});
    }

    for (const key of keys) {
        // Check that all keys are from 0 to 6
        if (![0, 1, 2, 3, 4, 5, 6].includes(parseInt(key))) {
            return res.status(400).json({error: "Invalid format. Expected keys from 0 to 6."});
        }

        // Check that each day has an array of time objects
        if (!Array.isArray(workHours[key])) {
            return res.status(400).json({error: "Invalid format. Expected an array for each day."});
        }

        // Loop through each time object for each day
        for(const time of workHours[key]) {
            // Check that each time object has start_time and end_time
            if(!time.hasOwnProperty('start_time') || !time.hasOwnProperty('end_time')) {
                return res.status(400).json({error: `Invalid format. Expected start_time and end_time. for day ${key}`});
            }

            // Check that start_time and end_time are valid time formats
            if(!isValidTimeFormat(time.start_time)) {
                return res.status(400).json({error: `Invalid format. Expected HH:mm:ss (24-hour format) for day ${key}.`});
            }
            if(!isValidTimeFormat(time.end_time)) {
                return res.status(400).json({error: `Invalid format. Expected HH:mm:ss (24-hour format) for day ${key}.`});
            }

            // Check that start_time is before end_time
            if(time.start_time >= time.end_time) {
                return res.status(400).json({error: `start_time must be before end_time for day ${key}.`});
            }
        }
    }

    next();
}

module.exports = validateWorkHourDetails;
