var express = require("express")
var router = express.Router();
var randomColor = require("randomcolor")
var synaptic = require("synaptic")
var  hexRgb = require('hex-rgb');

const COLORCOUNT = 20;

colorDefinitions = [
    {
        hue: "#f34336", //red
        count: COLORCOUNT
    },
    
     {
        hue: "#4CAF50", //green
        count: COLORCOUNT
    },
    
    {
        hue: "#2196F2", //blue
        count: COLORCOUNT
    },

    {
        hue: "#E81E63", //pink
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
        hue: "#673AB7", //mor
        count: COLORCOUNT
    },

    {
        hue: "#795548", //brown
        count: COLORCOUNT
    },

    {
        hue: "#FE9800", //orange
        count: COLORCOUNT
    },

    {
        hue: "#FEEA3B", //yellow
        count: COLORCOUNT
    }
]

allColors = []

// colorDefinitions.forEach(element => {
//     let cl = element.hue
//     let content = randomColor(element);
//     color = {
//         cl: cl,
//         content: content
//     }
//     allColors.push(color);
// });

colorDefinitions.forEach(element => {
    let cl = element.hue
    let content;
    if(cl === "white"){
        content  = new Array(COLORCOUNT).fill("#ffffff")
    }
    else if(cl === "black"){
        content  = new Array(COLORCOUNT).fill("#000000")
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

// console.log(hexRgb('4183c4'));

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
var hiddenLayer = new Layer(6);
var outputLayer = new Layer(10);

//Flattening the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// Defining the network
var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

// train the network
var learningRate = .3;
for (var i = 0; i < 200000; i++)
{
	for(var count = 0; count < trainingData.length; count ++){
        myNetwork.activate(trainingData[count]);
	    myNetwork.propagate(learningRate, outputData[count]);
    }	
}

// for(var i =0; i< 10; i++){
//     console.log("Start");
//     let select = Math.floor(Math.random()*42);
//     console.log("NN Answer");
//     console.log(myNetwork.activate(trainingData[select]));
//     console.log("Real Data" + outputData[select]);
//     console.log("End");
// }

for(var i =0; i< 10; i++){
    console.log("Start");

    let rgbColor = hexRgb(randomColor({hue: "random", count: 1})[0]);
    let tempTrain = [ rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255, rgbColor.alpha];
    let green = [0.207, 0.819, 0.796, 1]
    console.log("NN Answer");
    console.log(myNetwork.activate(tempTrain));
    console.log("Giren renk "+ tempTrain[0]*255 + " " + tempTrain[1]*255 + " " + tempTrain[2]*255);
    console.log("End");
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

router.get("/ai", (req,res) => {
    res.render("ai", {
        title: "Express",
        allColors: allColors
    });
})

module.exports = router