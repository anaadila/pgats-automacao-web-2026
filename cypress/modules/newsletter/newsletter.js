const seletores = {
  tituloSubscription: '.single-widget h2',
  campoEmailNewsletter: '#susbscribe_email',
  botaoSubscribe: '#subscribe',
  mensagemSucessoNewsletter: '#success-subscribe'
};

function validarWidgetDeAssinaturaVisivel() {
  cy.get(seletores.tituloSubscription)
    .scrollIntoView()
    .should('be.visible')
    .and('have.text', 'Subscription');
}

function assinarNewsletter(email) {
  cy.get(seletores.campoEmailNewsletter).type(email);
  cy.get(seletores.botaoSubscribe).click();
}

function validarMensagemDeSucessoDaAssinatura() {
  cy.get(seletores.mensagemSucessoNewsletter)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  validarWidgetDeAssinaturaVisivel,
  assinarNewsletter,
  validarMensagemDeSucessoDaAssinatura
};