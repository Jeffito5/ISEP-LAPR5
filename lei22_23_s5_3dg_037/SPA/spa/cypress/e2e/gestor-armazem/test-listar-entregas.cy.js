describe('Gestor de armazéns', () => {
  it('lista entregas por filtragem e sai', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })
    cy.contains('Listar entregas').click();

    cy.get('input').type('M07').click();
    cy.wait(5000);
    //cy.get('input').clear();
    // volta atrás
    cy.get('#b1').click();

  })
})