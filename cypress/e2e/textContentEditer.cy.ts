/// <reference types="cypress" />

describe("add new text content", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("新しい著者を追加する", () => {
    cy.findByTestId("cy-sidebar-edit").click();
    cy.findByTestId("cy-newPage-button").click();
    cy.findByTestId("cy-register-author-input").type("鴨長明");
    // cy.findByRole("button", {
    //   name: "追加",
    // }).click();
    cy.findByRole("combobox").click();
    cy.findAllByRole("option", {
      name: "鴨長明",
    });
  });

  it("新規テキストの作成", () => {
    cy.findByTestId("cy-sidebar-edit").click();
    cy.findByTestId("cy-newPage-button").click();
    cy.findByRole("combobox").click();
    cy.findByRole("option", {
      name: "鴨長明",
    }).click();
    cy.findAllByText("タイトル").should("be.visible");
  });

  it("テキストのタイトルを編集", () => {
    cy.contains("li", "タイトル").click();
    cy.findByTestId("title-edit-button").click();
    cy.findByTestId("cy:text-title-input").type("更新");
    cy.contains("button", "Save").click();
    cy.contains("li", "更新").should("be.visible");
  });

  it("テキストのコンテンツを編集", () => {
    cy.contains("li", "タイトル").click();
    cy.findByTestId("cy:content-edit-button").click();
    cy.findByTestId("editing-textarea").type("更新");
    cy.contains("button", "Save").click();
    cy.contains("textarea", "更新").should("be.visible");
  });

  it("テキストの削除", () => {
    cy.findByTestId("cy-sidebar-edit").click();
    cy.findAllByTestId("delete-button").then((elements) => {
      const lastElement = elements[0];
      cy.wrap(lastElement).click();
    });
    cy.contains("li", "更新").should("not.exist");
  });
});

export {};
