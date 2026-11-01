const seletores = {
    // Adição de produtos 
    botaoAdicionarPrimeiroProduto: '.features_items .single-products .add-to-cart',
    modalContinuarComprando: '.modal-content .btn-success',

    // Acesso e validação do Carrinho
    menuCarrinho: 'a[href="/view_cart"]',
    botaoCheckout: '.check_out',
    linhaDoProduto: '#cart_info_table tbody tr'
};

function adicionarPrimeiroProdutoAoCarrinho() {
    cy.get(seletores.botaoAdicionarPrimeiroProduto).first().click();
    cy.get(seletores.modalContinuarComprando).should('be.visible').click();
}

function acessarCarrinho() {
    cy.get(seletores.menuCarrinho).first().click();
}

function validarProdutoNoCarrinho() {
    cy.get(seletores.linhaDoProduto).should('have.length.greaterThan', 0);
}

function prosseguirParaCheckout() {
    cy.get(seletores.botaoCheckout).should('be.visible').click();
}

module.exports = {
    adicionarPrimeiroProdutoAoCarrinho,
    acessarCarrinho,
    validarProdutoNoCarrinho,
    prosseguirParaCheckout
};