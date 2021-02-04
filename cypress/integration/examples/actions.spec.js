const { createYield } = require("typescript");

describe('Verificar se o projeto abriu', () => {
  it('Validar tela inicial', () => {
    cy.visit('http://localhost:4200/');
  })
});
