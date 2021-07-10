import React from "react";
import { CssBaseline, Container, Typography } from "@material-ui/core";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          Hello
        </Typography>
      </Container>
    </React.Fragment>
  );
}
