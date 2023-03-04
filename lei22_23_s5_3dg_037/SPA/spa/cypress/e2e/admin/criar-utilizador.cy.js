describe('Admin', () => {
  it('cria um utilizador', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.contains('Criar um utilizador').click();

    cy.get('#nome').type('Teste');
    cy.get('#email').type('Teste');
    cy.get('#password').type('Teste');
    cy.get('#dataNascimento').type('2001-01-19');
    cy.get('#numeroTelefone').type('962864781');
    cy.get('#tipoUserSel').select('Gestor Armazem');

    cy.wait(2000);

    // voltar
    cy.get('#b2').click();

  })

  it('limpar', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.contains('Criar um utilizador').click();

    cy.wait(2000);

    // limpar
    cy.get('#b3').click();

  })

  it('voltar', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.contains('Criar um utilizador').click();

    cy.wait(2000);

    // voltar
    cy.get('#b2').click();

  })
})