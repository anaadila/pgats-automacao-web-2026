const seletores = {
  // Tela inicial de Signup
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  
  // Formulário de Informações da Conta
  tituloSignup: '.signup-form h2',
  radioGeneroMasculino: '#id_gender1',
  radioGeneroFeminino: '#id_gender2',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  checkNewsletter: '#newsletter',
  checkOfertas: '#optin',
  
  // Formulário de Endereço
  tituloFormulario: '.login-form > h2',
  primeiroNome: '[data-qa="first_name"]',
  ultimoNome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  
  // Confirmação e Exclusão
  mensagemSucesso: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
  botaoExcluirConta: 'a[href="/delete_account"]',
  mensagemExclusao: '[data-qa="account-deleted"]',
  mensagemErroSignup: '.signup-form form p'
};

function acessarTelaDeCadastro() {
  cy.visit('/login');
}

function validarFormularioVisivel() {
  cy.get(seletores.tituloSignup)
    .should('be.visible')
    .and('have.text', 'New User Signup!');
}

function validarTelaDeInformacoesVisivel() {
  cy.get(seletores.tituloFormulario)
    .should('be.visible')
    .and('have.text', 'Enter Account Information');
}

function validarMensagemDeErroSignup(mensagemEsperada) {
  cy.get(seletores.mensagemErroSignup)
    .should('be.visible')
    .and('contain.text', mensagemEsperada);
}

function iniciarNovoCadastro(nome, email) {
  cy.get(seletores.nome).type(nome);
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoSignup).click();
}

function preencherDadosDoUsuario(usuario) {
  if (usuario.genero.toLowerCase() === 'masculino') {
    cy.get(seletores.radioGeneroMasculino).check();
  } else if (usuario.genero.toLowerCase() === 'feminino') {
    cy.get(seletores.radioGeneroFeminino).check();
  }

  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.diaNascimento).select(usuario.diaNascimento);
  cy.get(seletores.mesNascimento).select(usuario.mesNascimento);
  cy.get(seletores.anoNascimento).select(usuario.anoNascimento);
  
  cy.get(seletores.checkNewsletter).check();
  cy.get(seletores.checkOfertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.endereco2).type(usuario.endereco2);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);
}

function confirmarCriacaoDeConta() {
  cy.get(seletores.botaoCriarConta).click();
}

function validarCadastroRealizado() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('have.text', 'Account Created!');
  cy.get(seletores.botaoContinuar).click();
}

function excluirConta() {
  cy.get(seletores.botaoExcluirConta).click();
}

function validarContaExcluida() {
  cy.get(seletores.mensagemExclusao)
    .should('be.visible')
    .and('have.text', 'Account Deleted!');
  cy.get(seletores.botaoContinuar).click();
}

module.exports = {
  acessarTelaDeCadastro,
  validarFormularioVisivel,
  validarTelaDeInformacoesVisivel,
  iniciarNovoCadastro,
  preencherDadosDoUsuario,
  confirmarCriacaoDeConta,
  validarCadastroRealizado,
  excluirConta,
  validarContaExcluida,
  validarMensagemDeErroSignup
};