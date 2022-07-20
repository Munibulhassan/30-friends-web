import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

// SITE LOGO
// import sitelogo from '../Assets/logo.png';

function Footer() {
  return (
    <section class="main-footer">
    <>
  <Container>
       <Row>
         <Col md={12}>
        	<div className="f-logo">
        		{/* <a href="index.php"><img src={sitelogo} alt='logo'/></a> */}
        	</div>
        	<div className="about">
          <h4>About</h4>
          <p>Lost Im The Metaverse is a Visionary
            Sci-Fi Collective On Ethereum Allegorithmically Generated By Randomly Programmed Humans.</p>
       </div>
       </Col>
        </Row>
        </Container>
  </>
  <div class="copy-right">
  <div class="container">
    <p>©2022. All Rights Reserved.</p>
  </div>
</div>
</section>
  );
}

export default Footer;
