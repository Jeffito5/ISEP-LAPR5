describe('Admin', () => {
  it('logout', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.wait(2000);

    cy.contains('Logout').click();

  })
})