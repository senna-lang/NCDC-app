/// <reference types="cypress" />

describe("add new text content", () => {
  it("新しい著者を追加する", () => {
    cy.findByTestId("cy-sidebar-edit").click();
    cy.findByRole("button", {
      name: "New page",
    }).click();
    cy.findByPlaceholderText("著者を追加").type("鴨長明");
    cy.findByRole("button", {
      name: "追加",
    }).click();
    cy.findByRole("listitem", {
      name: "鴨長明",
    }).should("be.visible");
  });
});

export {};
