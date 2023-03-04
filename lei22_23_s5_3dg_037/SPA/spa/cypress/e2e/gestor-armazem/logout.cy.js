describe('Gestor de armazéns', () => {
  it('logout', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })

    cy.wait(2000);
    
    cy.contains('Logout').click();

  })
})