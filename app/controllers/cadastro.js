module.exports.cadastro = function (app, req, res) {
  res.render("cadastro", { validacao: {}, dadosForm: {} });
};

module.exports.cadastrar = function (app, req, res) {
  var dadosForm = req.body;

  req.assert("nome", "Nome não pode ser vazio").notEmpty();
  req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
  req.assert("senha", "Senha não pode ser vazio").notEmpty();
  req.assert("casa", "Casa não pode ser vazio").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.render("cadastro", { validacao: erros, dadosForm: dadosForm });
    return;
  }

  var connection = app.config.database;

  var UsuariosDAO = new app.app.models.UsuariosDAO(connection);
  var JogoDAO = new app.app.models.JogoDAO(connection);

  UsuariosDAO.inserirUsuario(dadosForm);
  JogoDAO.gerarParametros(dadosForm.usuario);

  res.render("index", { validacao: {} });
};
