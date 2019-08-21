import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "../components/Header";

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
        <link href="/static/styles.css" rel="stylesheet" />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
