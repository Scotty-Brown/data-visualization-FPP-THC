describe('Search', () => {

  beforeEach(() => {
    cy.intercept('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`, {
      statusCode: 200,
      fixture: 'IBM-general-info'
    }).as('generalInfo')

    cy.intercept('GET', `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`, {
      statusCode: 200,
      fixture: 'IBM-income-statement'
    }).as('incomeStatement')

    cy.intercept('GET', `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`, {
      statusCode: 200,
      fixture: 'IBM-balance-sheet'
    }).as('balanceSheet')

    cy.visit('http://localhost:3000')
    .wait('@generalInfo')
    .wait('@incomeStatement')
    .wait('@balanceSheet')
  })

  it('Should show search results', () => {
    
    cy.intercept('GET', `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=SAIC&apikey=demo`, {
      statusCode: 200,
      fixture: 'SAIC-search'
    }).as('searchResults')

    cy.get('#searchInput').type('SAIC')
    cy.get('#search-button').click()
    cy.wait('@searchResults')

    cy.get('#search-results').children().should('have.length', 5)
    cy.get('#search-results').children().first().should('have.text', 'SAIC')
    cy.get('#search-results').children().last().should('have.text', '600104.SHH')
  })

  it('Should update MainContent after user selection', () => {

    cy.intercept('GET', `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=SAIC&apikey=demo`, {
      statusCode: 200,
      fixture: 'SAIC-search'
    }).as('searchResults')

    cy.intercept('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=SAIC&apikey=demo`, {
      statusCode: 200,
      fixture: 'SAIC-gi'
    }).as('generalInfo')

    cy.intercept('GET', `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=SAIC&apikey=demo`, {
      statusCode: 200,
      fixture: 'SAIC-is'
    }).as('incomeStatement')

    cy.intercept('GET', `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=SAIC&apikey=demo`, {
      statusCode: 200,
      fixture: 'SAIC-bs'
    }).as('balanceSheet')

    cy.get('#searchInput').type('SAIC')
    cy.get('#search-button').click()
    cy.wait('@searchResults')

    cy.get('#search-results').children().first().click()
    cy.wait('@generalInfo')
    cy.wait('@incomeStatement')
    cy.wait('@balanceSheet')

    cy.generalInfoCheck('SAIC', 'Science Applications International Corporation Common Stock', 'SERVICES-COMPUTER INTEGRATED SYSTEMS DESIGN', 'TECHNOLOGY', '2024-01-31')

  })

})