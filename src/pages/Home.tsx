import * as React from "react";
import { Container, Navbar } from "react-bootstrap";


export function Home() {
  return (
    <Container>
      <Navbar style={{ background: "#3C3744", padding: 30, width: "100%", marginBottom: 30 }}>
        <h3 className=" text-center w-100 text-white">Home</h3>
      </Navbar>
      <p className="text-center text-info">

      </p>
      
    </Container>
  );
}
