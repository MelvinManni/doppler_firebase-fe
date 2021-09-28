import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export interface ipDataInterface {
  city: string;
  country: string;
  continent: string;
  region: string;
  timezone: {
    name: string;
    abbreviation: string;
    gmt_offset: number;
    current_time: string;
  };
}

function App() {
  const [messages, setMessages] = React.useState<{ name: string; message: string }[]>([]);
  const [ipDetails, setIpDetails] = React.useState<ipDataInterface>();
  const [name, setName] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [submiting, setSubmiting] = React.useState<boolean>(false);

  const getIpDetails = async () => {
    try {
      const response = await fetch("https://us-central1-doppler-2f409.cloudfunctions.net/restApi/");
      const details = await response.json();
      setIpDetails(details);
    } catch (error) {
      alert(error);
    }
  };

  const getMessage = async () => {
    setLoading(true);
    try {
      const messagesReq = await fetch("https://us-central1-doppler-2f409.cloudfunctions.net/restApi/messages");
      const messages = await messagesReq.json();
      setMessages(messages);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    setSubmiting(true);
    e.preventDefault();
    try {
      await fetch("https://us-central1-doppler-2f409.cloudfunctions.net/restApi", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name,
          message,
        }),
      });
      setSubmiting(false);
      alert("message added successfully!");
      await getMessage();
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getMessage();
    getIpDetails()
  }, []);

  return (
    <Container className="mt-5">
      <Row className="mb-4 justify-content-between">
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
      </Row>

      <h1 className="my-4 text-center">Add New Message</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            rows={3}
          />
        </Form.Group>

        <Button disabled={submiting} type="submit" className="w-100">
          {submiting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
      <div className="my-5">
        <h1 className="mb-4 text-center">Messages</h1>

        <Row>
          {loading
            ? "Loading..."
            : messages.map((message) => (
                <Col xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <Card.Header>
                      <h5>{message.name}</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>{message.message}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </Container>
  );
}

export default App;
