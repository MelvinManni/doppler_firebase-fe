import * as React from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../config/AuthContext";
import { signUpData } from "../types";

export function Signup() {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [state, setState] = React.useState<signUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { signUpUser } = React.useContext(AuthContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...(prev as signUpData),
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    signUpUser(state, {
      cb: () => {
        setLoading(false);
        history.push("/login");
      },
      err: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Navbar style={{ background: "#3C3744", padding: 30, width: "100%", marginBottom: 30 }}>
        <h3 className=" text-center w-100 text-white">Sign Up</h3>
      </Navbar>
      <Container>
        <Row className=" justify-content-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required onChange={handleChange} value={state?.firstName} name="firstName" type="text" placeholder="Enter Your First Name" />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required onChange={handleChange} value={state?.lastName} name="lastName" type="text" placeholder="Enter Your Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required onChange={handleChange} value={state?.email} name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required minLength={6} onChange={handleChange} value={state?.password} name="password" type="password" placeholder="Password" />
              </Form.Group>

              <Button className="w-100 btn-lg mt-4" variant="primary" type="submit">
                {loading ? "Loading..." : " Sign Up"}
              </Button>
              <div className="mt-2 text-center">
                Already have ann account? <Link to="/login">Log In</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
