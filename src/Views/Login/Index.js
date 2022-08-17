import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import login_log from "../../Assets/login-logo.webp";
import Signup from "../Signup/Index.js";
import axios from "axios";
import { login } from "../../Action/action";
import { Rings } from "react-loader-spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const userLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    // alert('submit')
    const userData = {
      email: email,
      password: password,
    };

    const res = await login(userData);

    
    if (res == true) {
      navigate("/User_panel");
    } else {
      
      const e = document.getElementsByClassName("loginemail");
      e.setAttribute("class", "error");
      const p = document.getElementsByClassName("loginpassword");
      p.setAttribute("class", "error");
    }

    // const header ={headers: {
    //     'Content-Type': 'application/json'
    //   }}
    // await axios.post('https://thirty-friends.herokuapp.com/api/v1/auth/login',JSON.stringify(userData),header)
    // .then((response) => {

    //     window.userData = response.data.data;
    //     navigate('/User_panel');

    // }).catch((error) => {
    //     alert(error)
    // })
  };

  return (
    <section className="login-sec">
      <div className="login-logo">
        <img src={login_log} alt="logo" />
      </div>
      <div className="login-area">
        <h2>Welcome</h2>
        <p>Log in to Thirty Friends, Inc. to continue to 30f-dev.</p>
      </div>
      <div className="login-fields">
        <Form onSubmit={userLogin}>
          <Form.Control
            type="text"
            placeholder="Email adress"
            className="loginemail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            className="loginpassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="">Forgot Password?</a>

          <Col md={12}>
            {" "}
            {loading ? (
              <Rings
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            ) : (
              <button type="submit" className="cont">
                Continue
              </button>
            )}
          </Col>
          <Col md={12}>
            {" "}
            <p className="already-account">
              Don't have an account? <Link to={"/Signup"}>Sign up</Link>
            </p>
          </Col>
        </Form>
      </div>
    </section>
  );
}

export default Login;
