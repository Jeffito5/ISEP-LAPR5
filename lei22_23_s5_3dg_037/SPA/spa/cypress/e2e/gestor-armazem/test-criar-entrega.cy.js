describe('Gestor de armazéns', () => {
  it('criar uma entrega', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })

    cy.contains('Criar uma entrega').click();

    cy.get('#dataEntrega').type('2023-10-11');
    cy.get('#massa').type('123');
    cy.get('#tempoColocarEntrega').type('123');
    cy.get('#tempoRetirarEntrega').type('321');
    cy.get('#armazens').select('M17');

    cy.wait(2000);

    // confirma os dados e faz post
    cy.get('#b1').click();
  })

  it('limpa os dados e sai', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })

    cy.contains('Criar uma entrega').click();

    cy.get('#dataEntrega').type('2023-10-11');
    cy.get('#massa').type('123');
    cy.get('#tempoColocarEntrega').type('123');
    cy.get('#tempoRetirarEntrega').type('321');
    cy.get('#armazens').select('M17');

    cy.wait(2000);
    
    // carrega no botão de limpar os dados
    cy.get('#b3').click();

    cy.wait(2000);
    
    cy.get('#b2').click();
  })
})