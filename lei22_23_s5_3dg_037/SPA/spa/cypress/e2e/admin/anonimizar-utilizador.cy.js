describe('Admin', () => {
  it('anonimiza users', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })
    cy.contains('Anonimizar um utilizador').click();
    cy.get('#emailEmail').select('ju.oliveira2001@gmail.com');
    cy.wait(2000);
  })

  it('volta atrás', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })
    cy.contains('Anonimizar um utilizador').click();
    cy.wait(2000);
    cy.get('#b2').click();
  })
})