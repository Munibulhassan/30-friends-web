import { Container, Row, Col,Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import login_log from '../../Assets/login-logo.webp';
import { useState } from 'react';
import axios from 'axios';

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userSignup = async (obj) => {
        obj.preventDefault()
        if(password === confirmPassword){
            const userData = {
                email : email,
                password : password,
                passwordConfirm : confirmPassword
            };
            const header ={headers: { 
                'Content-Type': 'application/json'
              }}
            await axios.post('https://thirty-friends.herokuapp.com/api/v1/auth/signup',JSON.stringify(userData),header)
            .then((response) => {
                
                localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
                localStorage.setItem(
                  "AccessToken",
                  JSON.stringify(response.data?.data?.token)
                );
                
                navigate('/User_info');
            }).catch((error) => {
                alert(error)
            })
        }else{
            alert("password Doesn't match")
        }
    }
    return(
        <section className="login-sec">
                <div className="login-logo">
                    <img src={login_log} alt="logo" />
                </div>
                <div className="login-area">
                    <h2>Welcome</h2>
                    <p>Log in to Thirty Friends, Inc. to continue to 30f-dev.</p>
                </div>
                <div className="login-fields">
                    <Form onSubmit={userSignup}>
                    <Form.Control type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email adress" />
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    <Col md={12}> <Button type='submit' className='cont'>Continue</Button></Col>
                    </Form>
                   
                   <Col md={12}> <p className='already-account'>Don't have an account? <Link to={"/Login"}>Login</Link></p></Col>

                </div>
        </section>
    );
}

export default Login;