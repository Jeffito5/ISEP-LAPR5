describe('Gestor de logística', () => {
  it('abre rede viária 3D', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Rede Viária 3D').click();

    cy.wait(10000);

  })
})  
