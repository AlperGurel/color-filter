//express required for routing stuff
const express = require("express");
const path = require("path");
//getcolors is the current color extracting library


const indexRouter = require("./routes/index");


const port = 3000;
const app = new express();
const server = require("http").Server(app);
let io = require('socket.io')(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
//app.use("/node_modules",express.static("node_modules/"));
app.use(express.static(path.join(__dirname, "node_modules")));


app.use("/", indexRouter);

server.listen(port, () => console.log(`Port is running on port ${port}`));

io.sockets.on('connection',
  function (socket) {
    console.log("We have a new client: " + socket.id);
  });


