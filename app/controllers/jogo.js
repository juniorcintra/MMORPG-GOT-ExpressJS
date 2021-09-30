module.exports.jogo = function (app, req, res) {
  if (req.session.autorizado !== true) {
    res.render("index", { validacao: {} });
    return;
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa);
};

module.exports.sair = function (app, req, res) {
  req.session.destroy(function (err) {
    res.render("index", { validacao: {} });
  });
};

module.exports.suditos = function (app, req, res) {
  res.render("aldeoes", { validacao: {} });
};

module.exports.pergaminhos = function (app, req, res) {
  res.render("pergaminhos", { validacao: {} });
};
