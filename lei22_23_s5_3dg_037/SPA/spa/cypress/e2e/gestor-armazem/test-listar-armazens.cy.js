describe('Gestor de armazéns', () => {
  it('lista armazéns por filtragem e sai', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })

    cy.contains('Listar armazéns').click();

    cy.get('input').type('true');
    cy.wait(2000);
    cy.get('input').clear();
    cy.wait(2000);
    cy.get('input').type('false');
    cy.wait(2000);
    cy.get('input').clear();
    cy.wait(2000);

    // volta atrás
    cy.get('#b1').click();

  })
})