/// <reference types="cypress" />

const produto = require('../modules/produto/produto');

describe('Fluxos de Consulta de Produtos', () => {

    beforeEach(() => {
        cy.fixture('produtos').as('dadosProdutos');
    });

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

    // Test Case 09
    it('Deve pesquisar por um produto e validar os resultados', function () {
        // ARRANGE
        const termo = this.dadosProdutos.termoPesquisa;

        cy.visit('/');
        produto.acessarMenuProdutos();
        produto.validarPaginaDeProdutosVisivel();

        // ACT
        produto.pesquisarProduto(termo);

        // ASSERT
        produto.validarResultadosPesquisa(termo);
    });
});