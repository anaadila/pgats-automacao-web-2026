/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');

describe('Fluxos de Cadastro de Usuário', () => {

    before(() => {
        cy.fixture('usuarios').then((dados) => {
            cy.garantirUsuarioExistente(dados.usuarioExistente);
        });
    });

    beforeEach(() => {
        cy.fixture('usuarios').as('dadosUsuarios');
    });

    // Test Case 01
    it('Deve registrar um usuário com sucesso e excluí-lo no final', function () {

        // ARRANGE
        const usuario = this.dadosUsuarios.usuarioNovo;

        cadastro.acessarTelaDeCadastro();
        cadastro.validarFormularioVisivel()

        const emailDinamico = Date.now() + `-${usuario.email}`

        // ACT
        cadastro.iniciarNovoCadastro(usuario.nome, emailDinamico);
        cadastro.preencherDadosDoUsuario(usuario);
        cadastro.confirmarCriacaoDeConta();

        // ASSERT
        cadastro.validarCadastroRealizado();
        login.validarUsuarioAutenticado(usuario.nome);

        // ACT & ASSERT -- Exclusão
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
    });

    // Test Case 05
    it('Deve validar erro ao tentar cadastrar com e-mail já existente', function () {
        // ARRANGE
        const usuarioFixo = this.dadosUsuarios.usuarioExistente;

        cadastro.acessarTelaDeCadastro();
        cadastro.validarFormularioVisivel();

        // ACT
        cadastro.iniciarNovoCadastro(usuarioFixo.nome, usuarioFixo.email);

        // ASSERT
        cadastro.validarMensagemDeErroSignup(usuarioFixo.mensagemErroSignup);
    });
});