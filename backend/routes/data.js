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

router.get("/monthly", function (req, res) {
    const lastMonth = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30)).toISOString().replace('Z', '');

    const aggregatedDataQuery = `select category, metric_name, date_format(timestamp, '%Y-%m-%d %k:00:00') as datetime_hour, round(avg(metric_value),0) as avg_metric_value from sensor_data WHERE timestamp > '${lastMonth}' group by 1,2 ,3 order by 3 desc`
    dbConnection.query(aggregatedDataQuery, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

module.exports = router;
