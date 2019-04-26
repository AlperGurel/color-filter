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
    let stats = []
    let mappedStats = []
    socket.on("init", (data)=>{
        console.log(data)
        length = data.length;
        //process start


    });
    socket.on("singleImage", (data) => {
        // console.log(data.stats);
        stats.push(data.stats);

        // let map_ = colorMap.mapColor(data.stats);
        let map_ = colorMap.mapColor(data.stats.filter((item)=>{
           return item[3] > 0.01;
        //console.log(item[3]);
        }))
        
        mappedStats.push(map_);
        if(length && stats.length == length){
            console.log(stats);
            // console.log(data.stats);
            console.log(mappedStats);
            const modSt = {
                mappedStats: mappedStats
            }
            socket.emit("modStats", modSt)
        }
    });
  });


