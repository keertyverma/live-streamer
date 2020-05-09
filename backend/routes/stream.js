let streamDataSocket;

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

        socket.on("connect", () => console.log("Socket connected"));
        socket.on("disconnect", () => console.log("Socket disconnected"));
    });

    const sendData = (data) => {
        streamDataSocket.emit("stream-data", data);
    }
};