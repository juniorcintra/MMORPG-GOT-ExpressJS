module.exports = function (app) {
  app.get("/", function (req, res) {
    app.application.controllers.index(app, req, res);
  });
};
