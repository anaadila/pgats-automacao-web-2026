/// <reference types="cypress" />

const newsletter = require('../modules/newsletter/newsletter');

describe('Funcionalidade de Assinatura de Newsletter', () => {

    beforeEach(() => {
        cy.fixture('usuarios').as('dadosUsuarios');
    });

    // Test Case 10
    it('Deve validar a assinatura da newsletter com sucesso na página inicial', function () {
        // ARRANGE
        const email = this.dadosUsuarios.usuarioExistente.email;

        cy.visit('/');
        newsletter.validarWidgetDeAssinaturaVisivel();

        // ACT
        newsletter.assinarNewsletter(email);

        // ASSERT
        newsletter.validarMensagemDeSucessoDaAssinatura();
    });
});