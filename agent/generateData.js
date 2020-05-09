const io = require('socket.io-client'),
    socket = io('http://localhost:5000'),
    min = 10,
    max = 40,
    timeInterval = 3000, // every 1 sec
    timeOut = 900000;   // after 15 min

const sendData = function () {
    let dataObject = {
        category: "sensor_data",
        metric_name: "temperature",
        metric_value: Math.floor(Math.random() * (+max - +min)) + +min,
        timestamp: (new Date()).toISOString().replace('Z', '')
    };
    console.log(dataObject);
    socket.emit('agent-data', dataObject);
}

const timerId = setInterval(sendData, timeInterval);

setTimeout(() => { clearInterval(timerId) }, timeOut);