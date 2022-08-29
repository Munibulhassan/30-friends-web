import { Container } from "react-bootstrap";

import "./App.css";
import Get_started from "../src/Views/get_started/Index";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
  FeaturedVideoTileProvider,
} from "amazon-chime-sdk-component-library-react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <section className="main">
      <Container>
        <ThemeProvider theme={lightTheme}>
          <MeetingProvider>
            <FeaturedVideoTileProvider>

            <Get_started />
            </FeaturedVideoTileProvider>
          </MeetingProvider>
        </ThemeProvider>
      </Container>
    </section>
  );
}

export default App;
