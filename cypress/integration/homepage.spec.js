// const  LOGINBUTTON = Cypress.env("liBtn");
// const  HOME = Cypress.env("home")
 const  SSN = Cypress.env("ssn")




describe("renders the landing page", () => {

  it("should render share your data with bnp page", () => {
    cy.visit("/")
    cy.get("div").and("have.class", "LandingPage_word1__k2PgZ");
  });

  it("should render a clickable login button", () => {
    cy.get("button")
      .and("have.class", "Button_button__t7agX")
      .click({ multiple: true, force: true });
  });


  it("solid css login flow", () => {
    cy.visit("/")

    cy.get("button")
      .and("have.class", "Button_button__t7agX")
      .click({ multiple: true, force: true });

    cy.get("h1").contains("Community Solid Server")

    cy.get('#pno').clear();

    
    // change to your ssn in cypress.json
    cy.get('#pno').type(SSN);



    cy.get("button")
      .click({ multiple: true, force: true });


    /* 
      HAVE YOUR TEST-BANKID 
      READY AND DO A MANUAL LOGIN
    */

    cy.wait(7000)
    
    cy.get("button")
      .click({ multiple: true, force: true });



  });

});
