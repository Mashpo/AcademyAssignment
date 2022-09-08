// NPM modules
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// Custom modules
var User = require("../../Models/accounts");

module.exports = () => {
  // Serialize - Turns the user object into an id after successful authentication
  passport.serializeUser((user, callback) => {
    return callback(null, user.username);
  });
  // Deserialize - Turns the id into a user object
  passport.deserializeUser((username, callback) => {
    User.getOneUser(username, (err, user) => {
      return callback(err, user);
    });
  });
  const veriFields = {
    usernameField: "username",
    passwordField: "password",
  };
  const strategy = new LocalStrategy(veriFields, User.checkLogin);
  passport.use(strategy);
};