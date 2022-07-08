/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("displays some labels", () => {
    cy.contains("Multiplication");
    cy.contains("Echantillonage");
    cy.get("div.control-panel").contains("Multiplicateur");
  });

  it("test play button", () => {
    cy.get("button").contains("Play").click();
    cy.get("button").contains("Stop");
    cy.wait(2000);
    cy.get("button").contains("Stop").click();
    cy.get("button").contains("Play");
  });
});
