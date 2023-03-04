describe('Gestor de logística', () => {
  it('realiza planeamento frota', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Planeamento de frota').click();

    cy.wait(2000);

    // preenche todos os dados relativos ao planeamento
    cy.get('#dataEntrega').type('2023-10-11');
    cy.get('#heuristicasL').select('Algoritmo genético');
    // confirma os dados e faz post
    //cy.get('#b1').click();  
    cy.wait(2000);

    cy.get('#b2').click();   
  })
})  
