const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: 'form[action*="login"]',
  usuarioAutenticado: '.shop-menu li a b',
  botaoLogout: 'a[href*="logout"]'
};

function acessarTelaDeLogin() {
  cy.visit('/login');
}

function validarFormularioLoginVisivel() {
  cy.get(seletores.tituloLogin)
    .should('be.visible')
    .and('have.text', 'Login to your account');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .should('be.visible')
    .and('have.text', nome);
}

function validarMensagemDeErro(mensagemEsperada) {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain.text', mensagemEsperada);
}

function efetuarLogout() {
  cy.get(seletores.botaoLogout).click();
}

function validarRetornoAoLogin() {
  cy.url().should('include', '/login');
  cy.get(seletores.tituloLogin).should('be.visible');
}

module.exports = {
  acessarTelaDeLogin,
  validarFormularioLoginVisivel,
  efetuarLogin,
  validarUsuarioAutenticado,
  validarMensagemDeErro,
  efetuarLogout,
  validarRetornoAoLogin
};