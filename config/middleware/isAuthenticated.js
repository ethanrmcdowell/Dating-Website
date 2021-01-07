module.exports = function(req, res, next) {
    // If the user is currently logged in we'll allow them to continue and view their profile
    if (req.isAuthenticated()) {
      return next();
    }
  
    // If the user isn't authenticated/logged in they'll be redirected to the log-in page.
    return res.redirect("/login");
  };
  