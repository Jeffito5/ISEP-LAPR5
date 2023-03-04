describe('Admin', () => {
  it('carrega em todos os botões e volta atrás', () => {
    cy.visit('http://localhost:4200/home-page', { timeout: 10000 })
    // Entra no menu Criar um utilizador e testa o botão para voltar atrás
    cy.contains('Criar um utilizador').click();
    cy.wait(2000);
    cy.get('#b2').click();
    cy.wait(2000);
    // Entra no menu Anonimizar um utilizador e testa o botão para voltar atrás
    cy.contains('Anonimizar um utilizador').click();
    cy.wait(2000);
    cy.get('#b2').click();~
    cy.wait(2000);
    // Entra no menu Listar utilizadores e testa o botão para voltar atrás
    cy.contains('Listar utilizadores').click();
    cy.wait(2000);
    cy.get('#b1').click();
    cy.wait(2000);
    cy.contains('Logout').click();
  })
})

