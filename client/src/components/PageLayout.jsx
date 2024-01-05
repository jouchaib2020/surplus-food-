import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

import { LoginForm } from './Auth';
import BagModal from './BagModal';
import RestaurantCard from './RestaurantCard';

function DefaultLayout() {

  return (
    <Row className="vh-100">
      <Col md={4} xl={3} bg="light" className="below-nav" id="left-sidebar">
        Filter Routes <br/>
      </Col>
      <Col md={8} xl={9} className="below-nav">
        <Outlet/>
      </Col>
    </Row>
  );
}

function MainLayout() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
    <Container style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)",}}> 
      {[1,2,3,4,5,6,7,8,9,10].map((item) => (
        <Row key={item}>
          <RestaurantCard setModalShow={setModalShow}/>
        </Row>
      ))
      }
    </Container>

    <BagModal
    show={modalShow}
    onHide={() => setModalShow(false)}
    />
  </>
  )
}

function AddLayout(props) {
  return (
    <h1>
      Add a new film
    </h1>
  );
}

function EditLayout() {


  return (
    <h1>
      Edit film
    </h1>
  );

}

function NotFoundLayout() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="secondary">Go Home!</Button>
          </Link>
        </>
    );
  }

/**
 * This layout shuld be rendered while we are waiting a response from the server.
 */
function LoadingLayout() {
  return (
    <Row className="vh-100">
      <Col md={4} bg="light" className="below-nav" id="left-sidebar">
      </Col>
      <Col md={8} className="below-nav">
        <h1>Film Library is loading ...</h1>
      </Col>
    </Row>
  )
}

function LoginLayout({login}) {
  return (
    <Row className="vh-100">
      <Col md={12} className="below-nav">
        <LoginForm login={login} />
      </Col>
    </Row>
  );
}

export { AddLayout, DefaultLayout, EditLayout, LoadingLayout, LoginLayout, MainLayout, NotFoundLayout };

