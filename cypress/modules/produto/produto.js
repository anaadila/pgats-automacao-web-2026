const seletores = {
  // Navegação e Listagem
  menuProdutos: 'a[href="/products"]',
  tituloPagina: '.title.text-center',
  listaProdutos: '.features_items .single-products',
  primeiroBotaoVerProduto: '.choose > ul > li > a',
  
  // Detalhes do Produto
  detalheNome: '.product-information h2',
  detalheCategoria: '.product-information p:contains("Category")',
  detalhePreco: '.product-information span span',
  detalheDisponibilidade: '.product-information p:contains("Availability")',
  detalheCondicao: '.product-information p:contains("Condition")',
  detalheMarca: '.product-information p:contains("Brand")'
};

function acessarMenuProdutos() {
  cy.get(seletores.menuProdutos).click();
}

function validarPaginaDeProdutosVisivel() {
  cy.url().should('include', '/products');
  cy.get(seletores.tituloPagina)
    .should('be.visible')
    .and('contain.text', 'All Products');
  
  cy.get(seletores.listaProdutos).should('have.length.greaterThan', 0);
}

function acessarPrimeiroProduto() {
  cy.get(seletores.primeiroBotaoVerProduto).first().click();
}

function validarDetalhesDoProdutoVisiveis() {
  cy.url().should('include', '/product_details');
  cy.get(seletores.detalheNome).should('be.visible');
  cy.get(seletores.detalheCategoria).should('be.visible');
  cy.get(seletores.detalhePreco).should('be.visible');
  cy.get(seletores.detalheDisponibilidade).should('be.visible');
  cy.get(seletores.detalheCondicao).should('be.visible');
  cy.get(seletores.detalheMarca).should('be.visible');
}

module.exports = {
  acessarMenuProdutos,
  validarPaginaDeProdutosVisivel,
  acessarPrimeiroProduto,
  validarDetalhesDoProdutoVisiveis
};