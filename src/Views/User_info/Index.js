import { useState } from 'react';
import {Container, Row, Col,Form } from 'react-bootstrap';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { updateuser } from '../../Action/action';
import login_log from '../../Assets/login-logo.webp';

function User_info(){
const data = JSON.parse(localStorage.getItem("user"))
    const [userName,setuserName]= useState(data.userName)
    const [contact,setcontact]= useState(data.contact)
    const [major,setmajor]= useState(data.major)
    const [town,settown]= useState(data.town)
const [photo,setphoto] = useState(data.photo)
const navigate = useNavigate()

const updateprofile =async ()=>{

    const formdata = new FormData()
    formdata.append('photo',photo)
    formdata.append('userName',userName)
    formdata.append('contact',contact)
    formdata.append('major',major)
    formdata.append('town',town)
    const data = await updateuser(formdata)
    
    
    if(data?.user){
        navigate('/User_panel')
    }


}
    return(
        <section className="user-info login-sec">
         <Container>
         <div className="login-logo">
                    <img src={login_log} alt="logo" />
                </div>
                <div className="login-area">
                    <h2>Account Information</h2>
                </div>
                <div className="login-fields">
                    <form>
                    <Form.Control type="text" placeholder="Name" value = {userName} onChange={(e)=>setuserName(e.target.value)}/>
                    <Form.Control type="text" placeholder="Hometown" value = {town} onChange={(e)=>settown(e.target.value)}/>
                    <Form.Control type="text" placeholder="Major" value = {major} onChange={(e)=>setmajor(e.target.value)}/>
                    <Form.Control type="text" placeholder="Contact Detail (Optional)" value = {contact} onChange={(e)=>setcontact(e.target.value)}/>
                    <small>Max file size: 5mb, accepted: jpg | gif | png</small>
                    <input type='file' id="image-upload" style={{display:'none'}} onChange={(e)=>setphoto(e.target.files[0])}/>
                    <label htmlFor="image-upload">     

                        <p type="button" class="chooseFileButton ">Choose a Profile picture (Optional)</p>
                    </label>
                    </form>
                    
                    <Col md={12}> <p className='already-account'>Agree to the terms and conditions</p> <span><input type="checkbox" name="Agree" class="sc-fWSCIC fMeuET" /></span> </Col>
                   <Col md={12}> <p onClick={()=> updateprofile()} className='submit-info'>Submit</p></Col>
                  

                </div>
         </Container>
        </section>
    );
}

export default User_info;