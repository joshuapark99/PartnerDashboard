const express = require("express");
const cors = require("cors");

const partnerRoutes = require("./routes/partner");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/partner", partnerRoutes);

module.exports = app;
