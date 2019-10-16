//routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport"); /* POST login. */
var userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      return userModel
        .getbyEmail(email)
        .then(user => {
          console.log(user);
          bcrypt.compare(password, user[0].password, function(err, res) {
            if (res == false) {
              return cb(null, false, {
                message: "Incorrect email or password."
              });
            } else {
              return cb(null, user, { message: "Logged In Successfully" });
            }
          });
          //   if (!user) {
          //     return cb(null, false, { message: "Incorrect email or password." });
          //   }
          //   return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);

router.post("/login", function(req, res, next) {
  // console.log(req.body.email);
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      console.log(user);
      console.log(info);

      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      } // generate a signed son web token with the contents of user object and return it in the response           const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/", function(req, res) {
  // Users().then(user => res.json(user));
});

router.post("/register", function(req, res, next) {
  // const { name, password } = req.body;
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // console.log(hashedPassword);
    var user = {
      email: req.body.email,
      password: hashedPassword
      // first_name: userInfo.first_name,
      // last_name: userInfo.last_name,
      // birth_date: userInfo.birth_date,
      // pseudonym: userInfo.pseudonym
    };
    // console.log(user);

    userModel.add(req.body.email, req.body.password).then(result => {
      console.log(result);
      res.send('{message: "success"}');
    });
  } else {
    res
      .status(500)
      .send('{errors: "Passwords don\'t match"}')
      .end();
  }
});

// router.post("/login", async function(req, res, next) {});
router.get("/me", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  res.json("Success! You can now see this without a token.");
});

module.exports = router;
