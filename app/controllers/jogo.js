module.exports.jogo = function (app, req, res) {
  if (req.session.autorizado) {
    res.render("jogo");
  } else {
    res.send("Usuario precisa fazer login");
  }
};

module.exports.sair = function (app, req, res) {
  req.session.destroy(function (err) {
    res.render("index", { validacao: {} });
  });
};
