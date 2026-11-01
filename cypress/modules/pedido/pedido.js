const seletores = {
    // Checkout 
    caixaComentario: 'textarea[name="message"]',
    botaoFazerPedido: 'a[href="/payment"]',

    // Pagamento
    nomeCartao: '[data-qa="name-on-card"]',
    numeroCartao: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    mesExpiracao: '[data-qa="expiry-month"]',
    anoExpiracao: '[data-qa="expiry-year"]',
    botaoPagar: '[data-qa="pay-button"]',

    // Confirmação
    mensagemSucessoPedido: '[data-qa="order-placed"] b'
};

function inserirComentario(texto) {
    cy.get(seletores.caixaComentario).type(texto);
}

function confirmarResumoDoPedido() {
    cy.get(seletores.botaoFazerPedido).click();
}

function preencherDadosDePagamento(dadosCartao) {
    cy.get(seletores.nomeCartao).type(dadosCartao.nome);
    cy.get(seletores.numeroCartao).type(dadosCartao.numero);
    cy.get(seletores.cvc).type(dadosCartao.cvc);
    cy.get(seletores.mesExpiracao).type(dadosCartao.mes);
    cy.get(seletores.anoExpiracao).type(dadosCartao.ano);
}

function confirmarPagamento() {
    cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
    cy.get(seletores.mensagemSucessoPedido)
        .should('be.visible')
        .and('have.text', 'Order Placed!');
}

module.exports = {
    inserirComentario,
    confirmarResumoDoPedido,
    preencherDadosDePagamento,
    confirmarPagamento,
    validarPedidoConfirmado
};