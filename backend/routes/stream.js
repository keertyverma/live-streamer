const dbConnection = require("../databaseConnection");

module.exports = (app, io) => {
    const uiIO = io.of('/ui'),
        agentIO = io.of('/agent');
    //Establishes socket connection.
    agentIO.on("connection", socket => {
        console.log('connected to agent socket', socket.id)

        socket.on('agent-data', function (data) {
            console.log(data)
            sendData(data);
        });

        socket.on("disconnect", () => console.log("Agent Socket disconnected"));
    });

    uiIO.on("connection", socket => {
        console.log('connected to ui socket', socket.id, socket.handshake.headers.origin)

        socket.on("disconnect", () => console.log("UI Socket disconnected"));
    });

    const sendData = (data) => {
        dbConnection.query('INSERT INTO sensor_data SET ?', data, (err, res) => {
            if (err) throw err;
        });
        uiIO.emit("stream-data", data);
    }
};