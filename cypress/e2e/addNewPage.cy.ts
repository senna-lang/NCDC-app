/// <reference types="cypress" />

describe("add new text content", () => {
  it("新しい著者を追加する", () => {
    cy.visit("/");
    cy.findByTestId("cy-sidebar-edit").click();
    cy.findByTestId("cy-newPage-button").click();
    cy.findByTestId("cy-register-author-input").type("鴨長明");
    cy.findByRole("button", {
      name: "追加",
    }).click();
    cy.findByRole("combobox").click();
    cy.findAllByRole('option', {
      name: "鴨長明",
    });
  });
});

export {};
