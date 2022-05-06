const HOME = Cypress.env("home")

describe("renders the landing page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the landingPage", () => {
    cy.get("#landingPage");
    cy.get("div").and("have.class", HOME); });

  it("test if loginbutton is clickable", () => {
    cy.get("button").and("have.class", "Button_button__t7agX");
    // button.click()
  });


});
