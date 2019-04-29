var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.get('/color', requiresLogin, (req, res, next) => {



    console.log("request coming")
    res.render("index", {
        title: "Express"
    });
});
module.exports = router;

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
    //   var err = new Error('You must be logged in to view this page.');
    //   err.status = 401;
    //   return next(err);
    res.redirect("/");
    }
  }