describe('Gestor de logística', () => {
  it('realiza planeamento', () => {
    cy.visit('http://localhost:4200/menu-gestor-logistica', { timeout: 10000 })

    cy.contains('Planeamento unitário').click();

    cy.wait(2000);

    // preenche todos os dados relativos ao planeamento
    cy.get('#camioesL').select('GY85BJ');
    cy.get('#dataEntrega').type('2023-10-11');
    cy.get('#heuristicasL').select('Pela massa');

    cy.wait(2000);
    // confirma os dados e faz post
    //cy.get('#b1').click();  
    
    cy.get('#b2').click();   
  })
})  
