    describe("renders the landing page", () => {


    it("should render the landingPage", () => {
        cy.visit("/")
        cy.get("#landingPage")
        cy.get("div").and("have.class", "HomePage_main__Io9UL")
    })

    it("test if loginbutton is clickable", () => {
        cy.visit("/")
          cy.get("button").and("have.class", "Button_button__t7agX")
        // button.click()
    })

})
