module.exports = {
  index(req, res, next) {
    res.render("static/index", {title: "Welcome to the GrocerApp"});
    console.log(req.user);
  }
}
