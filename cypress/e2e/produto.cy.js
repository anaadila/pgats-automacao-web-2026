/// <reference types="cypress" />

const produto = require('../modules/produto/produto');

describe('Fluxos de Consulta de Produtos', () => {

    // Test Case 08
    it('Deve validar a página de todos os produtos e os detalhes de um item específico', function () {
        // ARRANGE 
        cy.visit('/');

        // ACT 
        produto.acessarMenuProdutos();

        // ASSERT 
        produto.validarPaginaDeProdutosVisivel();

        // ACT
        produto.acessarPrimeiroProduto();

        // ASSERT 
        produto.validarDetalhesDoProdutoVisiveis();
    });
});