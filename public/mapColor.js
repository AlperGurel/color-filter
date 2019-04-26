
const rgbToHsl = require("rgb-to-hsl");

module.exports = {
    // mapColor: function(initialColors, type, err){
      mapColor: function(initialColors){
        let hslColors = [];
        hslColors = initialColors.map(color => {
            return rgbToHsl(color[0], color[1], color[2]);
        });
        hslColors = hslColors.map(element => {
          return [Math.round(element[0]), Math.round(parseInt(element[1], 10)), Math.round(parseInt(element[2],10))];
        });
        
        const mappedColors = hslColors.map(color => {
          // const rangesHue = [15, 40, 65, 165, 255, 280, 340];
          // const finalColors = ["#F34336","#795548", "#FEEA3B","#FFFFFF","#2196F2","#673AB7","#E81E63" ];

            if(color[2] > 80){
                //return "#fff";
                return "255,255,255";
            }
            else if(color[2] < 20){
              return "0,0,0";
            }
            // else if(color[2] > color[1] +20){
            //      return "#8B8B8B";
            // }
            else if(color[1] < 10){
              return "139,139,139";
            }
            else {

                if(color[0] <= 10 || color[0] > 340 ){
                    return "243,67,54";
                  }
                  if(color[0] > 10 && color[0] <= 40){
                      if(color[2] < 60 && color[1] < 60){
                          return "121,85,72";
                      }
                      else{
                        return "254,152,0";
                      }
                    
                  }
                  //add color name

                  if(color[0] > 40 && color[0] <= 65){
                    return "254,234,59";
                  }
                  if(color[0] > 65 && color[0] <=  165 ){
                    return "255,255,255";
                  }
                  if(color[0] > 165 && color[0] <= 255){
                    //return "#2196F2";
                    return "33,150,242";
                  }
                  if(color[0] > 255 && color[0] <= 280){
                    return "103,58,183";
                  }
                  if(color[0] >280 && color[0] <= 340){
                    console.log(color[0] + " " + color[1] + " " + color[2])
                    return "232,30,99";
                  }
            }

            
        
        });
        const distinct = (value, index, self) => {
          return self.indexOf(value) === index;
        }
        let distinctC = mappedColors.filter(distinct);
        d2 = distinctC.map((strn)=>{
          return JSON.parse("[" + strn + "]")

        });

        return d2;
    },

};
