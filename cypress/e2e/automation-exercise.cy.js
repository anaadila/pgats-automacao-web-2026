/// <reference types="cypress" />

describe('Automation Exercise', () => {
    // Cadastro
    // cy.get() -> elementos baseados em css selector
    // cy.contains() -> elementos baseados em texto

    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
        cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-123465789151@mail.com`)

        cy.get('[data-qa="signup-button"]').click()

        // radio buttons e checkboxes
        cy.get('#id_gender2').check()

        cy.get('[data-qa="password"]').type(`123456`)

        /// selectes e comboboxes
        cy.get('[data-qa="days"]').select(`1`)

        cy.get('[data-qa="days"]').select(`1`)
    })
})