import { onAuthStateChanged } from "@firebase/auth";
import * as React from "react";
import { Button, Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../config/AuthContext";
import { auth } from "../config/firebase";
import { ipDataInterface } from "../types";

export function Home() {
  const history = useHistory();
  const { currentUser, logOutUser } = React.useContext(AuthContext);
  const [ipDetails, setIpDetails] = React.useState<ipDataInterface>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getIpDetails = async () => {
    setLoading(true);
    try {
      const data = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=cf0aa9791bbc4483936392e20e985e72");
      const res = await data.json();
      console.log(res);
      setIpDetails(res as ipDataInterface);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) history?.push("/login");
    });

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    getIpDetails();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar style={{ background: "#3C3744", padding: 30, width: "100%", marginBottom: 30 }}>
        <h3 className=" text-center w-100 text-white">Home</h3>
      </Navbar>
      <Container>
        <h4 className="text-center text-info my-3">Welcome {currentUser?.firstName}</h4>
        <Row className="justify-content-center mb-5">
          <Button onClick={logOutUser} variant="danger" style={{ width: "max-content" }}>
            LogOut
          </Button>
        </Row>

        {loading ? (
          <h5 className="text-center">Loading...</h5>
        ) : ipDetails === undefined ? (
          <h5 className="text-center">No Data Returned :(</h5>
        ) : (
          <Row className=" justify-content-between">
            <Col className=" mb-4" xs={12} md={5}>
              <Card className=" h-100">
                <Card.Header>Personal Details</Card.Header>
                <Card.Body>
                  <p className="mb-3">First Name: {currentUser?.firstName}</p>
                  <p className="mb-3">Last Name: {currentUser?.lastName}</p>
                  <p className="mb-3">Email: {currentUser?.email}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col className=" mb-4" xs={12} md={5}>
              <Card className=" h-100">
                <Card.Header>Location</Card.Header>
                <Card.Body>
                  <p className="mb-3">Continent: {ipDetails?.continent}</p>
                  <p className="mb-3">Country: {ipDetails?.country}</p>
                  <p className="mb-3">Region: {ipDetails?.region}</p>
                  <p className="mb-3">City: {ipDetails?.city}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col className=" mb-4" xs={12} md={5}>
              <Card className=" h-100">
                <Card.Header>Timezone</Card.Header>
                <Card.Body>
                  <p className="mb-3">Name: {ipDetails?.timezone?.name}</p>
                  <p className="mb-3">Abbreviation: {ipDetails?.timezone?.abbreviation}</p>
                  <p className="mb-3">GMT Offset: {ipDetails?.timezone?.gmt_offset}</p>
                  <p className="mb-3">
                    Current Time: <span className="text-info">{ipDetails?.timezone?.current_time}</span>{" "}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col className=" mb-4" xs={12} md={5}>
              <Card className=" h-100">
                <Card.Header>IP Details</Card.Header>
                <Card.Body>
                  <p className="mb-3">
                    IP Address: <span className="text-primary">{ipDetails?.ip_address}</span>{" "}
                  </p>
                  <p className="mb-3">Latitude: {ipDetails?.latitude}</p>
                  <p className="mb-3">Longitude: {ipDetails?.longitude}</p>
                  <p className="mb-3">
                    VPN: <span className={`text-${!ipDetails?.security?.is_vpn ? "success" : "danger"}`}>{ipDetails?.security?.is_vpn ? "Yes" : "No"}</span>{" "}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
