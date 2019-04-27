var express = require("express")
var router = express.Router();
var randomColor = require("randomcolor")
var synaptic = require("synaptic")
var  hexRgb = require('hex-rgb');

const COLORCOUNT = 30;

colorDefinitions = [
    {
        hue: "red",
        count: COLORCOUNT
    },
    
     {
        hue: "green",
        count: COLORCOUNT
    },
    
    {
        hue: "blue",
        count: COLORCOUNT
    },

    {
        hue: "pink",
        count: COLORCOUNT
    },

    {
        hue: "monochrome",
        count: COLORCOUNT
    }

]

allColors = []

colorDefinitions.forEach(element => {
    let cl = element.hue
    let content = randomColor(element);
    color = {
        cl: cl,
        content: content
    }
    allColors.push(color);
});

// console.log(hexRgb('4183c4'));

let trainingData = [];
let outputData = [];

allColors.forEach((element) => {
    element.content.forEach((color) => {
        let rgbColor = hexRgb(color);
        let tempTrain = [ rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255, rgbColor.alpha];
        trainingData.push(tempTrain);
        let tempOut ;
        if(element.cl === "red")
            tempOut = [1,0,0,0,0];
        else if (element.cl === "green")
            tempOut = [0,1,0,0,0];
        else if (element.cl === "blue")
            tempOut = [0,0,1,0,0];
        else if (element.cl === "pink")
            tempOut = [0,0,0,1,0];
        else
            tempOut = [0,0,0,0,1];
        outputData.push(tempOut);
    })
});

shuffle(trainingData, outputData);


// Neural Network Definitions
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//Layers
var inputLayer = new Layer(4);
var hiddenLayer = new Layer(6);
var outputLayer = new Layer(5);

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

    let rgbColor = hexRgb(randomColor({hue: "monochrome", count: 1})[0]);
    let tempTrain = [ rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255, rgbColor.alpha];
    console.log("NN Answer");
    console.log(myNetwork.activate(tempTrain));
    console.log("Giren renk "+ tempTrain);
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