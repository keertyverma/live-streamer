const express = require("express");
const router = express.Router();

const dbConnection = require("../databaseConnection");

router.get("/", function (req, res) {
    const lastHour = new Date(new Date().getTime() - (1000 * 60 * 60)).toISOString().replace('Z', '');
    dbConnection.query(`SELECT * FROM sensor_data WHERE timestamp > '${lastHour}'`, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

module.exports = router;
