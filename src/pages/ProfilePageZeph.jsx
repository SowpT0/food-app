import { Col, Container, Image, Row } from "react-bootstrap";

export default function ProfilePageZeph() {
  return (
    <>
      <Container className="my-4">
        <Row>
          <Col lg={3} className="text-center mb-3">
            <Image
              src={"https://picsum.photos/id/237/200/200"}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </Col>

          <Col lg={9}>
            <h2 className="fw-bold mt-3">Your profile</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
