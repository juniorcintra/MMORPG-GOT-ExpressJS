const jogoDAO = require("../models/jogoDAO");

module.exports.jogo = function (app, req, res) {
  if (req.session.autorizado !== true) {
    res.render("index", { validacao: {} });
    return;
  }

  var msg = "";

  if (req.query.msg != "") {
    msg = req.query.msg;
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, msg);
};

module.exports.sair = function (app, req, res) {
  req.session.destroy(function (err) {
    res.render("index", { validacao: {} });
  });
};

module.exports.suditos = function (app, req, res) {
  if (req.session.autorizado !== true) {
    res.render("index", { validacao: {} });
    return;
  }
  res.render("aldeoes", { validacao: {} });
};

module.exports.pergaminhos = function (app, req, res) {
  if (req.session.autorizado !== true) {
    res.render("index", { validacao: {} });
    return;
  }

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  var usuario = req.session.usuario;

  JogoDAO.getAcoes(res, usuario);
};

module.exports.revogar_acao = function (app, req, res) {
  var url_query = req.query;

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  JogoDAO.revogarAcao(url_query.id_acao, res);
};

module.exports.ordenar_acao_sudito = function (app, req, res) {
  var dadosForm = req.body;

  req.assert("acao", "Ação deve ser informada").notEmpty();
  req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.redirect("jogo?msg=A");
    return;
  }

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  dadosForm.usuario = req.session.usuario;
  JogoDAO.acao(dadosForm);
  res.redirect("jogo?msg=B");
};
