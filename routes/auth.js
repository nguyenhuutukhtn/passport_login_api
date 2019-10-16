// //routes/auth.js
// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport"); /* POST login. */
// var userModel = require("../models/user.model");
// var bcrypt = require("bcryptjs");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     function(email, password, cb) {
//       return userModel
//         .getbyEmail(email)
//         .then(result => {
//           bcrypt.compare(password, result[0].password, function(err, res) {
//             if (res == false) {
//               return cb(null, false, {
//                 message: "Incorrect email or password."
//               });
//             } else {
//               return cb(null, user, { message: "Logged In Successfully" });
//             }
//           });
//           //   if (!user) {
//           //     return cb(null, false, { message: "Incorrect email or password." });
//           //   }
//           //   return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch(err => cb(err));
//     }
//   )
// );

// router.post("user/login", function(req, res, next) {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: "Something is not right",
//         user: user
//       });
//     }
//     req.login(user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       } // generate a signed son web token with the contents of user object and return it in the response           const token = jwt.sign(user, 'your_jwt_secret');
//       return res.json({ user, token });
//     });
//   })(req, res);
// });

// module.exports = router;

module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
  }
  next();
};
