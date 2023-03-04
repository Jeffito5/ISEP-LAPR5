describe('Gestor de frotas', () => {
  it('logout', () => {
    cy.visit('http://localhost:4200/menu-gestor-frota', { timeout: 10000 })

    cy.wait(2000);
    
    cy.contains('Logout').click();

  })
})