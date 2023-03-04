describe('Gestor de logística', () => {
  it('lista camiões', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Listar camioes').click();

    cy.wait(2000);

    cy.get('input').type('AX83BX').click();

    cy.wait(2000);

    cy.get('#b1').click();

  })
})
