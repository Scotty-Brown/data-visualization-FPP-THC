Cypress.Commands.add('sideBarLabelCheck', (id, text) => {
    cy.get(`#${id}`).should('have.text', text)
})

Cypress.Commands.add('generalInfoCheck', (symbol, name, industry, sector, latestQ) => {
    cy.get('#company-symbol').should('have.text', symbol)
    cy.get('#company-name').should('have.text', name)
    cy.get('#industry-body').should('have.text', industry)
    cy.get('#sector-body').should('have.text', sector)
    cy.get('#latest-q-body').should('have.text', latestQ)
} )