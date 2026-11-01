const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const carrinho = require('../modules/carrinho/carrinho');
const pedido = require('../modules/pedido/pedido');

describe('Fluxos de Compra e Checkout', () => {

    before(() => {
        cy.fixture('usuarios').then((dados) => {
            cy.garantirUsuarioExistente(dados.usuarioExistente);
        });
    });

    beforeEach(() => {
        cy.fixture('usuarios').as('dadosUsuarios');
    });

    // Test Case 15
    it('Deve realizar compra registrando um novo usuário antes do checkout', function () {
        // ARRANGE 
        const usuarioNovo = this.dadosUsuarios.usuarioNovo;
        const emailDinamico = Date.now() + `-${usuarioNovo.email}`

        cadastro.acessarTelaDeCadastro();
        cadastro.iniciarNovoCadastro(usuarioNovo.nome, emailDinamico);
        cadastro.preencherDadosDoUsuario(usuarioNovo);
        cadastro.confirmarCriacaoDeConta();
        cadastro.validarCadastroRealizado();
        login.validarUsuarioAutenticado(usuarioNovo.nome);

        // ACT 
        cy.visit('/');
        carrinho.adicionarPrimeiroProdutoAoCarrinho();
        carrinho.acessarCarrinho();
        carrinho.validarProdutoNoCarrinho();

        carrinho.prosseguirParaCheckout();
        pedido.inserirComentario('Pedido realizado via automação E2E (TC15)');
        pedido.confirmarResumoDoPedido();

        pedido.preencherDadosDePagamento(usuarioNovo.cartao);
        pedido.confirmarPagamento();

        // ASSERT & LIMPEZA 
        pedido.validarPedidoConfirmado();
        cadastro.excluirConta();
    });

    // Test Case 16
    it('Deve realizar compra realizando login de usuário existente antes do checkout', function () {
        // ARRANGE
        const usuarioFixo = this.dadosUsuarios.usuarioExistente;

        login.acessarTelaDeLogin();
        login.efetuarLogin(usuarioFixo.email, usuarioFixo.senha);
        login.validarUsuarioAutenticado(usuarioFixo.nome);

        // ACT 
        cy.visit('/');
        carrinho.adicionarPrimeiroProdutoAoCarrinho();
        carrinho.acessarCarrinho();
        carrinho.validarProdutoNoCarrinho();

        carrinho.prosseguirParaCheckout();
        pedido.inserirComentario('Pedido realizado via automação E2E (TC16)');
        pedido.confirmarResumoDoPedido();

        pedido.preencherDadosDePagamento(usuarioFixo.cartao);
        pedido.confirmarPagamento();

        // ASSERT (Sucesso da Compra)
        pedido.validarPedidoConfirmado();
    });
});