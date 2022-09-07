import { Container } from "react-bootstrap";

import "./App.css";
import "./responsive.css";
import Get_started from "../src/Views/get_started/Index";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <section className="main">
      <Container>
        <Get_started />
      </Container>
    </section>
  );
}

export default App;
