module.exports = function (app) {
  app.get("/", function (req, res) {
    app.application.controllers.index(app, req, res);
  });

  app.post("/autenticar", function (req, res) {
    app.application.controllers.autenticar(app, req, res);
  });
};
