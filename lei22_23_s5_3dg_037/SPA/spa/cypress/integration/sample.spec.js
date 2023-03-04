<reference types="cypress"/>

import Chance from "chance";
const chance = new Chance();

describe('Firestarter', () => {

const email = chance.email();
const pass = 'ValidPassword23';

beforeEach(() => {
    cy.visit('http://localhost:4200'); 
})

it('has a title', () => {
    cy.contains('Welcome to Firestarter');
    expect(2).to.equal(2)
});

it('blocks protected routes', () => {
    cy.get('#navToggle').click();
    cy.contains('Firestore').click();
    cy.get('notification-message').children().should('contain', 'You must be logged in').and('be.visible');
});

it('signs up a new user', () => {
    cy.get('#navToggle').click();
    cy.contains('Login').click();

    cy.url().should('include', 'login');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pass);
    cy.get('button[type=submit]').click();

    cy.contains('Welcome new user!');
    cy.contains('Logout');
});

it('allows the user to create notes', () => {
    cy.login(email, pass);

    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    const noteText = chance.sentence({ words: 5});
    const noteList = cy.get('main');

    noteList.should('not.contain');
});

});