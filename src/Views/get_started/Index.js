import { Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Login from '../Login/Index';
function get_started(){
    return(
        <section className='get-started'>
          <Container>
            <Row>
               <Col md={6}>
               <div className="started-head">
                   <h2>Feel <span>Really</span> Connected</h2>
                   <h3>30 Friends</h3>
                   <p>30 Friends is a virtual place to interact with people in a real and natural way.</p>
               </div>
               </Col>
               <Col md={6}>
                   <div className="connect-platform">
                   <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 5.99996V6.99996C30 7.13256 29.9473 7.25974 29.8536 7.35351C29.7598 7.44728 29.6326 7.49996 29.5 7.49996H28V8.24996C28 8.66414 27.6642 8.99996 27.25 8.99996H2.75C2.33581 8.99996 2 8.66414 2 8.24996V7.49996H0.5C0.367392 7.49996 0.240215 7.44728 0.146447 7.35351C0.0526784 7.25974 0 7.13256 0 6.99996V5.99996C7.1509e-07 5.90104 0.0293424 5.80434 0.0843126 5.7221C0.139283 5.63986 0.217411 5.57578 0.308812 5.53796L14.8088 0.0379559C14.9312 -0.0127334 15.0688 -0.0127334 15.1912 0.0379559L29.6912 5.53796C29.7826 5.57578 29.8607 5.63986 29.9157 5.7221C29.9707 5.80434 30 5.90104 30 5.99996ZM28.5 25H1.5C0.671562 25 0 25.6715 0 26.5V27.5C0 27.6326 0.0526784 27.7597 0.146447 27.8535C0.240215 27.9473 0.367392 28 0.5 28H29.5C29.6326 28 29.7598 27.9473 29.8536 27.8535C29.9473 27.7597 30 27.6326 30 27.5V26.5C30 25.6715 29.3284 25 28.5 25ZM5 9.99996V22H2.75C2.33581 22 2 22.3358 2 22.75V24H28V22.75C28 22.3358 27.6642 22 27.25 22H25V9.99996H21V22H17V9.99996H13V22H9V9.99996H5Z" fill="#545457"></path></svg>
                   <h2>A people connection platform</h2>
                   <Link to={"/login"}>Get started</Link>
                   </div>
               </Col>
            </Row>
          </Container>
        </section>
    );
}

export default get_started;