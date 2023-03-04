describe('Admin', () => {
  it('lista um utilizador', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.contains('Listar utilizadores').click();

    cy.get('input').type('ANONIMIZADO').click();
    
    cy.wait(2000);
    
    // volta atrás
    cy.get('#b1').click();

  })

  it('volta', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })

    cy.contains('Listar utilizadores').click();
    
    cy.wait(2000);
    
    // volta atrás
    cy.get('#b1').click();

  })
})