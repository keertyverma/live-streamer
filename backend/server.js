const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use("/", function (req, res) {
    res.send("WIP..server side")
})

server.listen(port, () => {
    console.log('server is up');
});