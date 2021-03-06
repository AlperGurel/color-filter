var express = require('express');
var router = express.Router();
var User = require('../models/users');


// GET route for reading data
router.get('/',  function (req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect("/color")
  }
  else{
    res.render("login", {

    });
  }
 
  });
  
  
  //POST route for updating data
  router.post('/', function (req, res, next) {
      console.log(req.body)
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      // res.send("passwords dont match");
      // return next(err);
      return res.send(err)
    }
  
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          console.log("burada redirect etmeli");
          return res.redirect('/color');
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
        
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          // return next(err);
          return res.send(err)
        } else {
          req.session.userId = user._id;
          console.log("after auth init funciton")
          return res.redirect('/color');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 402;
      //return next(err);
      // res.redirect(200, "/")
      res.send(err)
    
      //return res.json({status: "All fields required", redirect: '/'});
      // res.response("response")
      //return res.redirect("/")
      // console.log("all fields required")
      // res.render("login", {
      //   message: "All fields required."
      // })
    }
  })
  
  // GET route after registering
  router.get('/color', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
            return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          }
        }
      });
  });
  


  // GET for logout logout
  router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
  
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

  module.exports = router;