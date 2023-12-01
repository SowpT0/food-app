import { Col, Image, Row} from "react-bootstrap";

export default function AuthPage() {
    const loginImage = "https"

    return (
        <Row>
            <Col sm ={6}>
                <Image src = {loginImage} fluid />
            </Col>
            <Col sm = {6} >Login</Col>
        </Row>
    )
}