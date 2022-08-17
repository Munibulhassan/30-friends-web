import { Container } from 'react-bootstrap';

import './App.css';
import Get_started from '../src/Views/get_started/Index';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme,
} from 'amazon-chime-sdk-component-library-react';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
    <MeetingProvider>
      
    <section className='main'>

    <Container>
   <Get_started />
    </Container>
    </section>
    </MeetingProvider>
  </ThemeProvider>
  );
}

export default App;
