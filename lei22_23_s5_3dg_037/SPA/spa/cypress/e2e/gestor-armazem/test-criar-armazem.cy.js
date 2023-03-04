describe('Gestor de armazéns', () => {
  it('criar um armazém', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })
    cy.contains('Criar um armazém').click();

    cy.get('#idArmazem').type('M88');
    cy.get('#designacao').type('Santa Maria da Ladra');
    cy.get('#endereco').type('Rua SP5,  1010-102,  Santa Maria da Ladra');
    cy.get('#longitude').type('2.5483');
    cy.get('#latitude').type('10.9268');
    cy.get('#altitude').type('50');
    cy.get('#ativo').select('false');

    cy.wait(2000);

    // confirma os dados e faz post
    //cy.get('#b1').click()

  })

  it('limpa os dados e sai', () => {
    cy.visit('http://localhost:4200/menu-gestor-armazem', { timeout: 10000 })
    
    cy.contains('Criar um armazém').click();

    cy.get('#idArmazem').type('M88');
    cy.get('#designacao').type('Santa Maria da Ladra');
    cy.get('#endereco').type('Rua SP5,  1010-102,  Santa Maria da Ladra');
    cy.get('#longitude').type('2.5483');
    cy.get('#latitude').type('10.9268');
    cy.get('#altitude').type('50');
    cy.get('#ativo').select('false');

    cy.wait(2000);

    // carrega no botão de limpar os dados
    cy.get('#b3').click();

    cy.wait(2000);

    cy.get('#b2').click();
  })

})