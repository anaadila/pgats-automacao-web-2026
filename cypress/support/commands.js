// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('garantirUsuarioExistente', (usuario) => {

  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true, 
    failOnStatusCode: false,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: 'Mr',
      birth_date: usuario.diaNascimento,
      birth_month: usuario.mesNascimento,
      birth_year: usuario.anoNascimento,
      firstname: usuario.primeiroNome,
      lastname: usuario.ultimoNome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.endereco2,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  }).then((response) => {
    if (response.body.includes('Email already exists')) {
      cy.log('O usuário fixo já estava no banco. Tudo certo para os testes.');
    } else {
      cy.log('O banco estava vazio. Usuário fixo criado via API com sucesso!');
    }
  });
});