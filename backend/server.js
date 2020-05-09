const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    port = process.env.PORT || 5000,
    dataRouter = require("./routes/data");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use("/api/v1/data", dataRouter);
app.use("/", function (req, res) {
    res.sendFile(__dirname + "/home.html");
})
require('./routes/stream')(app, io);

server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});