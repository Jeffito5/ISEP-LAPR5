describe('Gestor de logística', () => {
  it('logout', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.wait(2000);
    
    cy.contains('Logout').click();

  })
})