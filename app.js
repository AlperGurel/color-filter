//express required for routing stuff
const express = require("express");
const path = require("path");
const colorMap = require("./public/mapColor")
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

io.sockets.on('connection',  (socket) => {
    console.log("We have a new client: " + socket.id);
    let length;
    let stats = [] //this will hold all loaded images
    let mappedStats = [] //this will hold all mapped images
    socket.on("init", (data)=>{
        console.log(data)
        length = data.length;
        //process start


    });
    socket.on("singleImage", (data) => {

        stats.push(data.stats);


        if(length && stats.length == length){
            stats.forEach((img) => {
                let map_ = colorMap.mapColor(img.filter((item)=>{
                    return item[3] > 0.01;
                }))
                mappedStats.push(map_);
            });
            console.log(mappedStats);
            socket.emit("modStats", mappedStats);
        }
    });
  });


