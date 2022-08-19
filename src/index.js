import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Extends/Header";
import reportWebVitals from "./reportWebVitals";
import { Col, Container, Row } from "react-bootstrap";
import Login from "./Views/Login/Index";
import Signup from "./Views/Signup/Index";
import User_panel from "./Views/User_panel/Index";
import User_info from "./Views/User_info/Index";
import Join_lounge from "./Views/Join_Lounge/Index";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Joinroom from "./Views/meetingroom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <Container fluid>
      <div className="site-bg">
        <Row>
          <Col xs={2} md={2} lg={2} className="px-0">
            <header className="pageheader">
              <Header />
            </header>
          </Col>
          <Col xs={10} md={10} lg={10}>
            <div className="site-content">
              {/* <App /> */}
              <Routes>
                <Route path="/" element={<App />} />
                {/* <Route path="/get_started" element={<get_started />} /> */}
                <Route path="/Login" element={<Login />} /> 
                
                <Route path="/Signup" element={<Signup />} />
                <Route path="/User_panel" element={<User_panel />} />
                <Route path="/User_info" element={<User_info />} />
                <Route path="/join_lounge/:id" element={<Join_lounge />} />
                <Route path="/joinroom" element = {<Joinroom/>}/>
              </Routes>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
