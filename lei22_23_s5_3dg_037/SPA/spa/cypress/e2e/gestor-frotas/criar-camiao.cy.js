describe('Gestor de frotas', () => {
  it('criar camião', () => {
    cy.visit('http://localhost:4200/menu-gestor-frota', { timeout: 10000 })

    cy.contains('Criar um camiao').click();

    cy.get('#matricula').type('NH34MN');
    cy.get('#tara').type('123');
    cy.get('#capacidadeCarga').type('12');
    cy.get('#cargaBaterias').type('32');
    cy.get('#autonomia').type('400');  
    cy.get('#tempoCarregamento').type('17');  

    cy.wait(2000);
    
    //cy.get('#b1').click();

  })

  it('criar camião, limpar e voltar', () => {
    cy.visit('http://localhost:4200/menu-gestor-frota', { timeout: 10000 })
    
    cy.contains('Criar um camiao').click();

    cy.get('#matricula').type('NH34MN');
    cy.get('#tara').type('123');
    cy.get('#capacidadeCarga').type('12');
    cy.get('#cargaBaterias').type('32');
    cy.get('#autonomia').type('400');  
    cy.get('#tempoCarregamento').type('17');  

    cy.wait(2000);
    
    //cy.get('#b1').click();
    
    // limpar
    cy.get('#b3').click();

    cy.wait(2000);

    // voltar
    cy.get('#b2').click();

  })
})