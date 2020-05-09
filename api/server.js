/* Backend Server ----
   1. Create server
   2. Configure Socket.io
   3. Enable Cross Origin Resource Sharing (CORS)
   4. Register routes
*/

const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    dataRouter = require("./routes/data"),
    dotenv = require('dotenv');

dotenv.config();
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors())
app.use("/api/v1/data", dataRouter);

require('./routes/stream')(io);
const port = process.env.SERVER_PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});