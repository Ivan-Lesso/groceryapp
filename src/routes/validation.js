module.exports = {
  validateUsers(req, res, next) {
    if(req.method === "POST") {

      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },
  validateLists(req, res, next) {

    if(req.method === "POST") {

      req.checkBody("title", "must be at least 5 characters in length").isLength({min: 5});
    }

    const errors = req.validationErrors();

    if (errors) {

      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },
  validateItems(req, res, next) {

    if(req.method === "POST") {

      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
    }

    const errors = req.validationErrors();

    if (errors) {

      return res.send(303, req.headers.referer)
    } else {
      return next();
    }
  }
}
