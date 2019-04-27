var express = require("express");
var router = express.Router();


router.get('/color', (req, res) => {
    console.log("req coming")
    res.render("index", {
        title: "Express"
    });
});
module.exports = router;