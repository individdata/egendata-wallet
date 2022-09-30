import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Grid, Stepper, Typography } from "@mui/material";
import MenuBar from "../../components/MenuBar/MenuBar";
import { FormattedMessage } from "react-intl";
import { signIn } from "next-auth/react";

const Landing = () => {
  const router = useRouter();
  const [payload, setPayload] = useState("");

  useEffect(() => {
    if (router.isReady && router.query.payload) {
      setPayload(router.query.payload as string);
    }
  }, [router.isReady]);

  if (payload) {
    // Process payload

    return (<Typography>{payload}</Typography>)
  }

  return (
    <Container maxWidth="md">
      <MenuBar disabledNav />

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
            
          </Grid>
          <Grid item xs={12}>
            <h2>
              <FormattedMessage
                defaultMessage="To handle your request you need to identify yourself."
                id="5fkC00"
                description="Landing page instruction."
              />
            </h2>
            <h3 style={{ color: "grey" }}>
              <FormattedMessage
                defaultMessage="If you are a first time user of Project OAK an account will be created for you when you log in."
                id="gWb9Tk"
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
              onClick={() => signIn("solid", { callback: '/request' })}
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
    </Container>
  );
};

export default Landing;
