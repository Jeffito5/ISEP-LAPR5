describe('Gestor de logística', () => {
  it('lista rotas', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Listar rotas').click();

    cy.wait(2000);

    cy.get('input').type('M01').click();

    cy.wait(2000);

    cy.get('#b1').click();
  })
})  