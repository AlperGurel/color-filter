//express required for routing stuff
const express = require("express");
const path = require("path");
const colorMap = require("./public/mapColor")

//getcolors is the current color extracting library
// Require library
var excel = require('excel4node');

const indexRouter = require("./routes/index");
const aiRouter = require("./routes/ai");

const port = 3000;
const app = new express();
const server = require("http").Server(app);
let io = require('socket.io')(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "exports")));
//app.use("/node_modules",express.static("node_modules/"));
app.use(express.static(path.join(__dirname, "node_modules")));

//use it with a blank slash and routers
app.use("/", indexRouter);
app.use("/", aiRouter);

server.listen(port, () => console.log(`Port is running on port ${port}`));

io.sockets.on('connection',  (socket) => {
    console.log("We have a new client: " + socket.id);
    let length;
    let stats = [] //this will hold all loaded images
    let mappedStats = [] //this will hold all mapped images
    let aiStats = []
    let excelStats = []
    let excelNames = []
    socket.on("init", (data)=>{

        length = data.length;

            


    });
    socket.on("singleImage", (data) => {

        stats.push(data.stats);
        excelNames.push(data.filename);

        if(length && stats.length == length){
            stats.forEach((img) => {
                let map_ = colorMap.mapColor(img.filter((item)=>{
                    return item[3] > 0.01;
                }))
                let map2_ = aiRouter.mapColor(img.filter((item)=>{
                    // return item[3] > 0.05;
                    return 1
                }));

                mappedStats.push(map2_);
                //aiStats.push(map2_)

            });

            // socket.emit("modStats", mappedStats);
            socket.emit("aiStats", mappedStats);
            mappedStats.forEach((item, index) => {
                excelStats.push(item);
            });
            createExcel(excelStats, excelNames);

            stats = []
            mappedStats = []
        }
    });
  });

  function createExcel(mappedStats, excelNames){
      let black = [255,255,255];
      let gray = [139,139,139];
      let red = [243,67,54];
      let colorss =[black,gray,red];
      let colors = [[255,255,255],[0,0,0],[139,139,139],[243,67,54],[121,85,72],[254,152,0],[254,234,59],[33,150,242],[103,58,183],[232,30,99]];

// Create a new instance of a Workbook class
var workbook = new excel.Workbook();

// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('My Photos');
// var worksheet2 = workbook.addWorksheet('Sheet 2');

// Create a reusable style
var style = workbook.createStyle({
  font: {
    color: '#FF0800',
    size: 12
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -'
});


// Set value of cell A1 to 100 as a number type styled with paramaters of style
worksheet.cell(1,1).string('ImageName').style(style);
// worksheet.cell(1,2).string('Black').style(style);
// worksheet.cell(1,3).string('Gray').style(style);
// worksheet.cell(1,4).string('Red').style(style);

colors.forEach((element,index) => {
    worksheet.cell(1,index+2).string(JSON.stringify(element)).style(style);
});

excelNames.forEach((element,index) => {
    worksheet.cell(index+2,1).string(element).style(style);
   
});



let counter = 0;
for(let i = 0; i < colors.length; i++){
    for(let j = 0; j < mappedStats.length; j++){
        for(let k = 0; k < mappedStats[j].length; k++){
            if(arraysEqual(mappedStats[j][k],colors[i])){
                worksheet.cell(j+2,i+2).string('True');
                break;
            }
            else{
                worksheet.cell(j+2,i+2).string('False');
            }
        }
    }
}



// // Set value of cell C1 to a formula styled with paramaters of style
// worksheet.cell(1,3).formula('A1 + B1').style(style);

// // Set value of cell A2 to 'string' styled with paramaters of style
// worksheet.cell(2,1).string('string').style(style);

// // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
// // worksheet.cell(3,1).bool(true)

workbook.write(path.join(__dirname, "exports", "Excel.xlsx"));
// workbook.write('Excel.xlsx');
  }

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

