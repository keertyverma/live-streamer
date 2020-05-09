let streamDataSocket;
const dbConnection = require("../databaseConnection");

module.exports = (app, io) => {
    app.post('/pause', function (req, res) {
        return res.send("Data stream paused");
        // TODO destroy stream
    });

    app.post('/resume', function (req, res) {
        return res.send("Data stream is resumed");
        // TODO start data stream
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        streamDataSocket = socket;

        socket.on('agent-data', function (data) {
            console.log(data)
            sendData(data);
        });

        socket.on("disconnect", () => console.log("Socket disconnected"));
    });

    const sendData = (data) => {
        dbConnection.query('INSERT INTO sensor_data SET ?', data, (err, res) => {
            if (err) throw err;
        });
        streamDataSocket.emit("stream-data", data);
    }
};