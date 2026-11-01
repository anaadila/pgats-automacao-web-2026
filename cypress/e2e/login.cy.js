/// <reference types="cypress" />

const login = require('../modules/login/login');

describe('Fluxos de Autenticação (Login e Logout)', () => {
    let usuarioFixo;

    before(() => {
        cy.fixture('usuarios').then((dados) => {
            usuarioFixo = dados.usuarioExistente;
            cy.garantirUsuarioExistente(usuarioFixo);
        });
    });

    beforeEach(() => {
        cy.fixture('usuarios').as('dadosUsuarios');
    });

    // Test Case 02
    it('Deve efetuar login com e-mail e senha corretos', function () {
        // ARRANGE
        const usuario = this.dadosUsuarios.usuarioExistente;

        login.acessarTelaDeLogin();
        login.validarFormularioLoginVisivel()

        // ACT
        login.efetuarLogin(usuario.email, usuario.senha);

        // ASSERT
        login.validarUsuarioAutenticado(usuario.nome);
    });

    // Test Case 03
    it('Deve validar mensagem de erro com credenciais incorretas', function () {
        // ARRANGE
        const usuario = this.dadosUsuarios.usuarioInvalido;

        login.acessarTelaDeLogin();
        login.validarFormularioLoginVisivel()

        // ACT
        login.efetuarLogin(usuario.email, usuario.senha);

        // ASSERT
        login.validarMensagemDeErro(usuario.mensagemErroEsperada);
    });

    // Test Case 04
    it('Deve efetuar logout com sucesso', function () {
        // ARRANGE
        const usuario = this.dadosUsuarios.usuarioExistente;

        login.acessarTelaDeLogin();
        login.efetuarLogin(usuario.email, usuario.senha);
        login.validarUsuarioAutenticado(usuario.nome);

        // ACT
        login.efetuarLogout();

        // ASSERT
        login.validarRetornoAoLogin();
    });
});