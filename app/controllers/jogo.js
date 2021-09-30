module.exports.jogo = function (app, req, res) {
  if (req.session.autorizado !== true) {
    res.render("index", { validacao: {} });
    return;
  }

  var comando_invalido = "N";

  if (req.query.comando_invalido === "S") {
    comando_invalido = "S";
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = app.config.database;
  var JogoDAO = new app.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
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
  res.render("pergaminhos", { validacao: {} });
};

module.exports.ordenar_acao_sudito = function (app, req, res) {
  var dadosForm = req.body;

  req.assert("acao", "Ação deve ser informada").notEmpty();
  req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.redirect("jogo?comando_invalido=S");
    return;
  }

  console.log(dadosForm);
  res.send("tudo certo");
};
