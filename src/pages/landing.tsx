import React from "react";
import { signIn } from "next-auth/react";
import { FormattedMessage } from "react-intl";
import { Container, Grid } from "@mui/material";
import styles from "./index.module.css";
import OakLogo from "../components/OakLogo/OakLogo";
import Stepper from "../components/Stepper";
import Button from "../components/ui/Button";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  const { request } = router.query;

  return (
    <Container>
      <Grid container className={styles.container}>
        <Grid item xs={12} className={styles.right}>
          <header>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                paddingTop: 16,
              }}
            >
              <OakLogo />
            </div>
          </header>
          <main>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>
                  <FormattedMessage
                    id="JvjNu7"
                    defaultMessage="Share your data with <boldThis>{party}</boldThis>"
                    description="Landing page main title."
                    values={{ party: "BNP Paribas", boldThis: "strong" }}
                  />
                </h2>
              </Grid>
              <Grid item xs={12}>
                <Stepper requestId={request as string} />
              </Grid>
              <Grid item xs={12}>
                <h2>
                  <FormattedMessage
                    defaultMessage="To handle your request you need to identify yourself." id="5fkC00"
                    description="Landing page instruction."
                  />
                </h2>
                <h3 style={{ color: "grey" }}>
                  <FormattedMessage
                    defaultMessage="If you are a first time user of Project OAK an account will be created for you when you log in." id="gWb9Tk"
                    description="Landing page further instruction."
                  />
                </h3>
              </Grid>
              <Grid item xs={12}>
                <a href="http://w3schools.com">
                  <FormattedMessage
                    id="aDPXaf"
                    defaultMessage="Project OAK terms and conditions"
                    description="Landing page terms and conditions text."
                  />
                </a>
              </Grid>
              <Grid item xs={12}>
                <Button
                  preset="medium"
                  type="primary"
                  onPress={() => signIn("solid", { callbackUrl: "/home" })}
                >
                  <FormattedMessage
                    id="L6PEya"
                    defaultMessage="Sign in"
                    description="Landing page sign in button."
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <h3>
                  <FormattedMessage
                    id="npMjyJ"
                    defaultMessage="Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organtisations."
                    description="Landing page footer disclaimer."
                  />
                </h3>
              </Grid>
            </Grid>
          </main>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
