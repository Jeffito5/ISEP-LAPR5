describe('Gestor de logística', () => {
  it('criar uma rota', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Criar um rota').click();

    // preenche todos os dados relativos às rotas
    cy.get('#armazens').select('M01');
    cy.get('#armazens2').select('M09');
    cy.get('#distancia').type('10');
    cy.get('#energiaGasta').type('10');
    cy.get('#tempoMaximo').type('10');
    cy.get('#tempoExtra').type('10');

    cy.wait(2000);

    //confirma os dados e faz post
    // cy.get('#b1').click();

  })

  it('criar uma rota, limpar e sair', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Criar um rota').click();

    // preenche todos os dados relativos às rotas
    cy.get('#armazens').select('M01');
    cy.get('#armazens2').select('M09');
    cy.get('#distancia').type('10');
    cy.get('#energiaGasta').type('10');
    cy.get('#tempoMaximo').type('10');
    cy.get('#tempoExtra').type('10');

    //confirma os dados e faz post
    // cy.get('#b1').click();

    cy.wait(2000);

    //limpa os dados
    cy.get('#b3').click();

    cy.wait(2000);

    cy.get('#b2').click();

  })
})