var express = require("express")
var router = express.Router();
var randomColor = require("randomcolor")
var synaptic = require("synaptic")
var  hexRgb = require('hex-rgb');
var fs = require("fs");
const rgbHex = require('rgb-hex');

const grayList = [
    [154, 159, 168],
[71, 73, 79],
[145, 145, 145],
[76, 73, 73],
// [193, 191, 191],
[86, 86, 86],
[155, 155, 155],
[109, 109, 108]
// [53, 53, 53],
// [68, 68, 68],
// [135, 129, 129],
// [168, 164, 164],
// [201, 197, 197],
// [219, 212, 212],
// [114, 112, 112],
// [196, 194, 194],
// [224, 222, 222],
// [104, 99, 99],
// [155, 149, 149],
// [204, 199, 199]
// [160, 152, 152],
// [63, 60, 60],
// [102, 98, 98],
// [137, 132, 132],
// [170, 164, 164],
// [114, 110, 110],
// [175, 175, 175],
// [216, 208, 208]
]
hexglist = grayList.map(element=>{

    return "#"+rgbHex(...element);
})
const RATIO = 0.02;

const COLORCOUNT = 50;
const rgbList = [
[243, 67, 54],
[76, 175, 80],
[33, 150, 242],
[232, 30, 99],
[0,0,0],
[255, 255, 255],
[102, 57, 181],
[121, 85, 72],
[254, 152, 0],
[254, 234, 59],
[139, 139, 139]
]

colorDefinitions = [
    {
        hue: "red", //red
        count: COLORCOUNT
    },
    
     {
        hue: "green", //green
        count: COLORCOUNT
    },
    
    {
        hue: "blue", //blue
        count: COLORCOUNT
    },

    {
        hue: "pink", //pink
        count: COLORCOUNT
    },

    {
        hue: "black", //black
        count: COLORCOUNT
    },

    {
        hue: "white", //white
        count: COLORCOUNT
    },

    {
        hue: "mor", //mor
        count: COLORCOUNT
    },

    {
        hue: "brown", //brown
        count: COLORCOUNT
    },

    {
        hue: "orange", //orange
        count: COLORCOUNT
    },


    {
        hue: "yellow", //yellow
        count: COLORCOUNT
    },
    {
        hue: "gray", //gray
        count: COLORCOUNT
    }
]

allColors = []

whiteList = [
    "#ffffff",
"#dbd9d9",
"#e0dede",
"#d6d6d6",
"#efe8e8",
"#f7eaea",
"#e5d7d7",
"#f7e8e8",
"#d8d8d8",
"#e5e5e5",
"#fff2f2",
"#f5f2ff",
"#f5f2ff",
"#fff2f8",
"#fffaf2",
"#fdfff2",
"#f8fff2",
"#f2fff6",
"#f2fff6",
"#f2fbff",
"#f2fbff",
"#f7f2e8",
"#f6f7e8",
"#f2f7e8",
"#eef7e8",
"#eaf7e8",
"#e8f7ec",
"#e8f7f3",
"#e8f5f7",
"#e8eff7",
"#e8eaf7",
"#ebe8f7",
"#f3e8f7",
"#f7e8ec"

]
morList = [
    "#e100ff",
"#bd00d6",
"#730082",
"#9900ad",
"#51005b",
"#36003d",
"#af0dc4",
"#860c96",
"#62096d",
"#6c1077",
"#8d159b",
"#7e1f89",
"#9e1fad",
"#902e9b",
"#772d7f",
"#813889",
"#8c4893",
"#bb00ff",
"#a000db",
"#8600b7",
"#68008e",
"#480063",
"#b210ef",
"#910fc1",
"#780ca0",
"#580975",
"#c423ff",
"#a014a0",
"#996b99",
"#965e96",
"#995499",
"#9b4a9b",
"#993d99",
"#993099",
"#992499",
"#8e0c8e",
"#931693",
"#960496",
"#9d00ff",
"#a81eff",
"#9b27e5",
"#8125bc",
"#6c239b",
"#5a1f7f"

]
yellowList = [
    "#fffa00",
"#fffa11",
"#fffa23",
"#fffa35",
"#fffa47",
"#fffa59",
"#fffa6d",
"#fffa7f",
"#fffa91",
"#fffaa5",
"#ede11e",
"#e2d60d",
"#fff000",
"#faff00",
"#faff11",
"#faff21",
"#faff32",
"#faff47",
"#faff59",
"#f5f96b",
"#e0e52b",
"#eff43d",
"#faff60",
"#faff77",
"#fff600",
"#fff60c",
"#fff621",
"#fff62d",
"#fff63f",
"#fff759",
"#fff768"

]
orangeList = [
    "#ff9400",
"#ff9a0f",
"#ffa121",
"#ffab3a",
"#ffb24c",
"#ffbc63",
"#ffc67a",
"#ffce8e",
"#ffd6a0",
"#d87b00",
"#d67e0a",
"#d6851b",
"#d67b1a",
"#d68126",
"#d68b3b",
"#d6924a",
"#d69755",
"#c9955e",
"#ffa100",
"#ffa814",
"#ffb02b",
"#ffb73f",
"#ffbd51",
"#ffc363",
"#ffcc7a",
"#ff5d00",
"#ff6811",
"#ff7526",
"#ff833d",
"#ff8e4f",
"#ff8947",
"#ff9960",
"#f49e6e",
"#ffb68e",
"#ffb993",
"#e56520",
"#e06d2f",
"#e07a43",
"#d88152",
"#d68d66",
"#d69775",
"#ff4800",
"#ff5411",
"#ff5f21",
"#ff6b32",
"#ff7a47",
"#ff9900",
"#ffa011",
"#ffa826",
"#ffb13d",
"#ffd182",
"#ffdca0",
"#f2c476",
"#ff8556",
"#B44321"

]
redList = [
"#ea6262",
"#d65151",
"#cc3b3b",
"#ea3333",
"#ea2a2a",
"#d61919",
"#d61111",
"#f21d1d",
"#d60e0e",
"#c60303",
"#f71111",
"#b50707",
"#b21e0e",
"#b21403",
"#c61300",
"#c11603",
"#c61b07",
"#cc200c",
"#e01f08",
"#d61802",
"#bf1300",
"#ce1e18",
"#b2130e",
"#b70903",
"#c60a03",
"#d80e06",
"#d6140c",
"#e21c14",
"#d11810",
"#c90e06",
"#b20a03",
"#c41109",
"#d1120a",
"#c92112",
"#b71507",
"#b5180a",
"#a81306",
"#b71305",
"#4c0408",
"#590106",
"#7a0108",
"#ad272f",
"#961018",
"#ed121f",
"#ea444d",
"#96030b",
"#cc3330",
"#c61511",
"#821310",
"#a51a17",
"#c4130f",
"#f4241f",
"#f73833",
"#f9403b",
"#c11b17",
"#cc0e0a",
"#e02a11",
"#aa7070",
"#d69e9e",
"#994e4e",
"#7f2c2c",
"#723232",
"#631515",
"#590b0b",
"#9b1414",
"#4f0000",
"#962822",
"#ff0d00",
"#ff362b",
"#ff4c42",
"#ff5d54",	
"#930700",
"#bf0900",
"#e50a00",
"#840500",	
"#aa1b16",
"#91312e",
"#93403e",
"#a35654",
"#6b2d2b",
"#c46060",
"#e57979",
"#a03636",
"#701919",
"#6d0e0e",
"#630606",
"#bf0505",
"#ef0000",
"#8e0404",
];
blueList = [
    "#c3f6f7",
    "#aee1e2",
    "#a2dadb",
    "#87c0c1",
    "#91d5d6",
    "#a2f1f2",
    "#97eeef",
    "#82d5d6",
    "#75cdce",
    "#68c0c1",
    "#71d5d6",
    "#76dfe0",
    "#80eced",
    "#75e4e5",
    "#60c3c4",
    "#488182",
    "#538384",
    "#6fa7a8",
    "#558889",
    "#4a8384",
    "#4faeaf",
    "#3fa9aa",
    "#5cf0f2",
    "#53d9db",
    "#40d3d6",
    "#29a3a5",
    "#2fd6d8",
    "#2fedef",
    "#24c7c9",
    "#0a6f70",
    "#08c8c9",
    "#1ceced",
    "#395b5b",
    "#345959",
    "#88d4e0",
    "#64aeba",
    "#48cde2",
    "#23aec4",
    "#28c7e0",
    "#13b9d3",
    "#14a5bc",
    "#067384",
    "#045663",
    "#0c4c56",
    "#2b717c",
    "#2a5b63",
    "#12a0b7",
    "#31bfd6",
    "#08798c",
    "#034651",
    "#012938",
    "#146787",
    "#23708e",
    "#1a4f63",
    "#256a84",
    "#439fc1",
    "#60c1e5",
    "#4999b7",
    "#034056",
    "#175c75",
    "#2394bc",
    "#468aa3",
    "#6698aa",
    "#3a96b7",
    "#1d81a5",
    "#13a0d3",
    "#00b5f7",
    "#07749b",
    "#024b66",
    "#023649",
    "#0e5b77",
    "#4c86c9",
    "#2b5d96",
    "#1f4a7a",
    "#0e3056",
    "#154377",
    "#6097d6",
    "#3f7abf",
    "#3e8ce8",
    "#1067ce",
    "#044ea5",
    "#005ece",
    "#026eef",
    "#074c9e",
    "#012a5b",
    "#066be2",
    "#0276ff",
    "#2786f7",
    "#2765f7",
    "#2d56b7",
    "#194bc1",
    "#082260",
    "#061842",
    "#021238",
    "#05153a",
    "#081a42",
    "#192d59",
    "#093eb5",
    "#1d56d6",
    "#01184c",
    "#0046e5",
    "#0029e5",
    "#2f48b7",
    "#0933e8",
    "#0327c1",
    "#011b8c",
    "#04124f",
    "#0e2484",
    "#0004ff",
    "#0d10aa",
    "#07097a",
    "#1e20b2",
    "#030577",
    "#0104ad",
    "#090ded",
    "#1c20ef",
    "#03055b",
    "#0d10a8",
    "#210ece",
]
greenList = [
    "#72ff00",
"#5eb716",
"#7de529",
"#56b50a",
"#3a7f03",
"#265402",
"#264f07",
"#27470e",
"#36561c",
"#56892d",
"#6dad3a",
"#79ba46",
"#96dd5f",
"#679b3f",
"#92db59",
"#93f248",
"#99ce6f",
"#b5ed89",
"#82aa63",
"#628448",
"#557a39",
"#72a34e",
"#a4f767",
"#93ff44",
"#89ff32",
"#7ffc23",
"#79ff16",
"#6cff00",
"#5cdb00",
"#64bf22",
"#509b1a",
"#67af33",
"#a1c687",
"#718e5c",
"#435933",
"#34422b",
"#2f4223",
"#304c1f",
"#2d4f19",
"#294f12",
"#326b10",
"#418718",
"#419b0c",
"#00ff15",
"#00d611",
"#00a50d",
"#007209",
"#004c06",
"#003804",
"#10ef20",
"#0fc41c",
"#07600e",
"#107718",
"#1d9b27",
"#20ad2c",
"#82ce88",
"#5a845d",
"#3b5e3d",
"#b5f4b8",
"#80ba83",
"#b7e2ba",
"#567258",
"#344c36",
"#6ec175",
"#5fd869",
"#37a340",
"#1f9b29",
"#0f911a",
"#15c624",
"#16bf4f",
"#0aaf42",
"#21ce5b",
"#2cf46f",
"#01b73e",
"#007728",
"#00aa39",
"#04db4c",
"#01561d",
"#0a5423",
"#75ad88",
"#365641",
"#284c34",
"#19592f",
"#36c467",
"#37e573",
"#1bd35b",
"#09bf48",
"#018930",
"#03bf44",
"#016b25",
"#004f1a",
"#003f14",
"#018e2e",	
"#00bc3c",
"#21af7b",
"#137752",
"#1fc185",
"#2ce8a2",	
"#90e5c5",
"#52997e",
"#1e5942",
"#125139",
"#064c31",
"#03774b",
"#07af6f",
"#1bd38d",
"#02301e",
"#617064",
"#425646",
"#9fb7a4",
"#84a58b",
"#4f6053",
"#38493b",
"#708474",
"#9bb5a0",
"#c3dbc7",
"#ddffe3",
"#98b79d",
"#6d7f71",
"#8daa94",
"#58665b",
"#47564a",
"#bec400",
"#9ea303",
"#8f9313",
"#92961c",
"#9da031",
"#a6aa0d",
"#b5ba03",
"#c4c916",
"#cdd308",
"#c4c91a",
"#d8dd30",
"#545600",
"#52540a",
"#545614",
"#818413",
"#92960c",
"#babf24"
]
brownList = [
    // "#75504e",
    // "#704947",
    // "#633e3c",
    // "#603a38",
    // "#4f302e",
    // "#4c2c2a",
    // "#442523",
    // "#4c2724",
    "#3f1e1c",
    "#4c211f",
    "#5b2826",
    "#491b19",
    "#5b2f27",
    "#5b2e26",
    "#51251e",
    "#5b261e",
    "#6d3229",
    "#703027",
    "#6d4537",
    "#895746",
    "#845a4b",
    "#82584a",
    "#966858",
    "#72493a",
    "#663e2f",
    "#593426",
    "#754331",
    "#894c37",
    "#753e2b",
    "#6d3724",
    "#5b2a19",
    "#4f2415",
    "#72321c",
    "#82371d",
    "#632914",
    "#59220e",
    "#441808",
    "#5b200b",
    "#66230b",
    "#70462a",
    "#5b3821",
    "#603e28",
    "#7a4d30",
    "#7f573d",
    "#683c1f",
    "#8e5027",
    "#93562d",
    "#8c542e",
    "#84512e",
    "#9b633c",
    "#7a441e",
    "#844519",
    "#773e16",
    "#703810",
    "#773a0e",
    "#70340a",
    "#893b04",
    "#682d03",
    "#542301",
    "#664118",
    "#5b3811",
    "#6b3f0e",
    "#663907",
    "#703c02",
    "#512b00",
    "#8c4c04",
    "#a05704",
    "#aa5f0a",
    "#b76b16",
    "#a0621c",
    "#a56926",
    "#a56b29",
    "#a06b30",
    "#af7738",
    "#a0692b",
    "#c98e4c",
    "#ad600a",
    "#b76203",
    "#965003",
    "#ad5b01",
    "#562d00",
    "#4f2b03",
    "#683f12",
    "#ad6105",
    "#96590f",
    "#965e19",
    "#996d38",
    "#8e6739",
    "#aa773a",
    "#915f24",
    "#915a1a",
    "#c48d4e",
    "#aa7a42",
    "#aa7c46",
    "#99754c",
    "#664928",
    "#a86c28",
    "#a87428",
    "#ad7d37",
    "#996c2c",
    "#936727",
    "#895d1e",
    "#6b4611",
    "#633c04",
];
pinkList = [
    "#C58A98",
    "#f2c4e0",
    "#f7c0e2",
    "#efb6d9",
    "#e5a9ce",
    "#e8a4ce",
    "#e597c7",
    "#e291c3",
    "#e288c0",
    "#d87db6",
    "#ce71ab",
    "#d66dae",
    "#d664aa",
    "#cc579f",
    "#cc4f9c",
    "#d1499c",
    "#db419f",
    "#e03ea1",
    "#e2369f",
    "#db2e97",
    "#d82792",
    "#d6208e",
    "#e01891",
    "#d10c83",
    "#ea048f",
    "#c40378",
    "#c1157d",
    "#cc2489",
    "#d13a95",
    "#b54c8b",
    "#b25c90",
    "#c6619e",
    "#dd6cb1",
    "#bf2a85",
    "#913a6f",
    "#f4a8d6",
    "#ea98ca",
    "#ff009b",
    "#e5028c",
    "#d60a86",
    "#ce238b",
    "#ea96c9",
    "#dd85ba",
    // "#c48b98"
];
blackList = [
    "#000000",
    "#161616",
    "#232222",
    "#1c1919",
    "#302e2e",
    "#212020",
    "#2d2a2a",
    "#211e1e",
    "#2d2c2c",
    "#232323",
    "#111010",
    "#211e1e",
    "#282323"
    
]
colorDefinitions.forEach(element => {
    let cl = element.hue
    let content;
    if(cl === "white"){
        content  = whiteList;
    }
    else if(cl === "black"){
        content  = blackList;
    }
    else if(cl === "gray"){
        content  = hexglist;
    }
    else if(cl === "red"){
        content = redList;
    }
    else if(cl ==="blue"){
        content = blueList;
    }
    else if(cl ==="green"){
        content = greenList;
    }
    else if(cl ==="brown"){
        content = brownList;
    }
    else if(cl ==="pink"){
        content = pinkList;
    }
    else if(cl === "orange"){
        content = orangeList;
    }
    else if(cl === "yellow"){
        content = yellowList;
    }
    else if(cl === "mor"){
        content = morList;
    }
    else{
        content = randomColor(element);
    }
    
    color = {
        cl: cl,
        content: content
    }
    allColors.push(color);
});



let trainingData = [];
let outputData = [];

allColors.forEach((element, index) => {
    element.content.forEach((color) => {
        let rgbColor = hexRgb(color);
        let tempTrain = [ rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255, rgbColor.alpha];
        trainingData.push(tempTrain);
        let tempOut = new Array(colorDefinitions.length).fill(0);
        tempOut[index] = 1;

        outputData.push(tempOut);
    })
});

shuffle(trainingData, outputData);


//Neural Network Definitions
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//Layers
var inputLayer = new Layer(4);
var hiddenLayer = new Layer(16);
var outputLayer = new Layer(colorDefinitions.length);

//Flattening the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);


// Defining the network
var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});


try{
    let raw = fs.readFileSync("exports/object.json")
    if (raw){
        myNetwork = Network.fromJSON(JSON.parse(raw));
    }
}


catch(err){
    var learningRate = .05;

    for (var i = 0; i < 2000; i++)
    {
        for(var count = 0; count < trainingData.length; count ++){
            myNetwork.activate(trainingData[count]);
            myNetwork.propagate(learningRate, outputData[count]);
        }	
    }
    var exportedNN = myNetwork.toJSON();
    var nnjson = JSON.stringify(exportedNN);

    fs.writeFileSync("exports/object.json", nnjson);

}




//train the network





for(var i =0; i< 1; i++){
    console.log("Start");

    let rgbColor = hexRgb(randomColor({hue: "random", count: 1})[0]);
    let tempTrain = [ rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255, rgbColor.alpha];
    clr = [171, 164, 148]
    let green = [clr[0]/255, clr[1]/255, clr[2]/255, 1]
    console.log("NN Answer");
    console.log(myNetwork.activate(green));
    //console.log("Giren renk "+ tempTrain[0]*255 + " " + tempTrain[1]*255 + " " + tempTrain[2]*255);
    console.log("End");
}


mapColor = function(initialColors){
    clrs = [[]]
    const codes = initialColors.map(element => {
        let element2 = [ element[0]/ 255, element[1] / 255, element[2] / 255, 1];

        return myNetwork.activate(element2);
    });
    console.log(initialColors)
    filteredcode = codes.map(element=>{
        return rgbList[indexOfMax(element)]
    });
    console.log(codes)
    // const distinct = (value, index, self) => {
    //     return self.indexOf(value) === index;
    // }

    finalcode = [];
    initialColors.forEach((element, ind) => {
        finalcode.push([filteredcode[ind][0], filteredcode[ind][1], filteredcode[ind][2], element[3]]);
    })

    sums = new Array(rgbList.length).fill(0);
    
    for(let i=0; i<rgbList.length; i++){
        for(let j=0; j<finalcode.length; j++){
            if(finalcode[j][0]===rgbList[i][0] && finalcode[j][1]===rgbList[i][1] && finalcode[j][2] == rgbList[i][2]){
                sums[i] += finalcode[j][3]
            }
        }
    }

    sumObj = sums.map((element,index)=>{
        let ind = rgbList[index]
        return {element: element, color: ind}
    })
    sums = sumObj.filter((element)=>{
        return element.element>RATIO;
    })

    dFiltered = sums.map(element=>{
       return element.color;
    })
    return dFiltered;
}




function shuffle(obj1, obj2) {
    var index = obj1.length;
    var rnd, tmp1, tmp2;
  
    while (index) {
      rnd = Math.floor(Math.random() * index);
      index -= 1;
      tmp1 = obj1[index];
      tmp2 = obj2[index];
      obj1[index] = obj1[rnd];
      obj2[index] = obj2[rnd];
      obj1[rnd] = tmp1;
      obj2[rnd] = tmp2;
    }
  }


  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


router.get("/ai", (req,res) => {
    res.render("ai", {
        title: "Express",
        allColors: allColors
    });
})

// module.exports = {
//     mapColor: function(initialColors){
//         console.log("asdfaf");
//         const codes = initialColors.map(element => {
//             let element = [ element[0]/ 255, element[1] / 255, element[2] / 255, 1];
    
//             return myNetwork.activate(element);
//         });
//         console.log(codes)
    
//     }
// }
router.mapColor = mapColor;
module.exports = router
// export default {router, mapColor}