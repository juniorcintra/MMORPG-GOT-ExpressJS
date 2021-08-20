module.exports.index = function (app, req, res) {
  res.render("index", { validacao: {} });
};

module.exports.autenticar = function (app, req, res) {
  var dadosForm = req.body;

  req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
  req.assert("senha", "Senha não pode ser vazio").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.render("cadastro", { validacao: erros, dadosForm: dadosForm });
    return;
  }

  var connection = app.config.database;

  var UsuariosDAO = new app.app.models.UsuariosDAO(connection);

  UsuariosDAO.autenticar(dadosForm, req, res);
};
