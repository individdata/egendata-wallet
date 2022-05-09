const HOME = Cypress.env("home")
const LOGINBUTTON = Cypress.env("liBtn")

describe("renders the landing page", () => {

   beforeEach(() => {
    //  cy.visit("/");
    cy.setCookie("_session.legacy.sig", "n1YU9qshIZGfgBIhzJRQgJlQlWA");
    cy.setCookie("_session.sig", "fRcq8m2i23fbvFl93lzDpQwnA_Q");
    cy.setCookie("_session.legacy", "jae62XElHSb-B_0uOWdVb");
    cy.setCookie("_session", "fRcq8m2i23fbvFl93lzDpQwnA_Q");
    cy.setCookie("fRcq8m2i23fbvFl93lzDpQwnA_Q", "fRcq8m2i23fbvFl93lzDpQwnA_Q");
    // cy.setItem("redirectPath",localStorage.getItem()
   });

  it("should render the landingPage", () => {
    cy.visit("/");
    cy.get("#landingPage");
    cy.get("div").and("have.class", HOME); });

  it("test if loginbutton is clickable", () => {
     cy.get("button").and("have.class", LOGINBUTTON )
      .click({multiple:true, force:true})
    //  cy.visit("https://oak-identity-provider-oak-develop.test.services.jtech.se/idp/consent/");
  });


});
