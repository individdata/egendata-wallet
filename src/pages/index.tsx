import React from "react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import OakLogo from "../components/OakLogo/OakLogo";
import Button from "../components/ui/Button";

import { signIn } from "next-auth/react";

const Index = () => {
  const router = useRouter();

  const { request } = router.query;
  if (request) {
    // TOOD: Do this redirect with a middleware instead?
    router.push(`/landing?request=${request}`);
  }

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} md={6} className={styles.left}>
        <article>
          <Image
            className={styles.logo}
            alt="left-logo"
            src="/images/oak-green.png"
            width="54"
            height="80"
          />
          <h1 className={styles.title}>
            <FormattedMessage
              id="aeoy6U"
              defaultMessage="Your data in your control"
              description="Index page main text."
            />
          </h1>
          <h3 className={styles.subtitle}>
            <FormattedMessage
              id="6RE9ba"
              defaultMessage="Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organizations."
              description="Index page main subtitle."
            />
          </h3>
        </article>
      </Grid>
      <Grid item xs={12} md={6} className={styles.right}>
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
          <h3 className={styles.loginTitle}>
            <FormattedMessage
              defaultMessage="Welcome to Egendata" id="DF7L5F"
              description="Index page welcome text."
            />
          </h3>
          <Button
            preset="medium"
            type="primary"
            onPress={() => signIn("solid")}
          >
            <FormattedMessage
              defaultMessage="Log in" id="4G0feJ"
              description="Index page log in button."
            />
          </Button>
          <div className={styles.line}>
            <a href="http://w3schools.com" className={styles.link}>
              <FormattedMessage
                defaultMessage="How do I login with BankID?" id="nGfQl/"
                description="Index page login help text."
              />
            </a>
          </div>
        </main>
      </Grid>
    </Grid>
  );
};

export default Index;
