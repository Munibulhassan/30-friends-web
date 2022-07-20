import { Container } from 'react-bootstrap';

import './App.css';
import Get_started from '../src/Views/get_started/Index';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <section className='main'>

    <Container>
   <Get_started />
    </Container>
    </section>
  );
}

export default App;
