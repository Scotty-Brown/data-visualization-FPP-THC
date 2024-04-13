describe('Page Load', () => {

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


  it('Sidebar', () => {

    // Title
    cy.sideBarLabelCheck('valueglance-title', 'ValueGlance')

    // Top Labels
    cy.sideBarLabelCheck('sidebar-top-labels:nth-child(1)', 'Dashboard')
    cy.sideBarLabelCheck('sidebar-top-labels:nth-child(2)', 'Watchlist')
    cy.sideBarLabelCheck('sidebar-top-labels:nth-child(3)', 'Stocks')
    cy.sideBarLabelCheck('sidebar-top-labels:nth-child(4)', 'Filter')
    cy.sideBarLabelCheck('takehome-assignment', 'Take Home Assignment')

    // Bottom Labels
    cy.sideBarLabelCheck('sidebar-bottom-labels:nth-child(1)', 'Help')
    cy.sideBarLabelCheck('sidebar-bottom-labels:nth-child(2)', 'Account')

  })

  it('Main Content', () => {
      
      // Titles
      cy.get('#visualization-page').should('have.text', 'Visualization Page')
      cy.get('#industry-title').should('have.text', 'Industry')
      cy.get('#sector-title').should('have.text', 'Sector')
      cy.get('#latest-q-title').should('have.text', 'Latest Quarter')

      // Company Data
      cy.generalInfoCheck('IBM', 'International Business Machines', 'COMPUTER & OFFICE EQUIPMENT', 'TECHNOLOGY', '2023-12-31')
  
  })

  it('Search', () => {

    // Feedback Button
    cy.get('#feedback-button').should('have.text', 'Leave Feedback')

    // Search Input
    cy.get("label").should('have.text', 'Search Ticker')
    cy.get('#searchInput').should('have.attr', 'placeholder', 'Search Company')

    // Search Button
    cy.get('#search-button').should('have.text', 'Search')

  })


})