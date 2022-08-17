import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import celebration from "../../Assets/celebration.jpeg";
import basketball from "../../Assets/basketball.jpeg";
import basking from "../../Assets/baking.jpeg";
import { useEffect, useState } from "react";
import { getAlllounges } from "../../Action/action";
import { imageURL } from "../../Action/config";
function User_panel() {
  const [lounges, setlounges] = useState([]);
  const [sortedlounges, setsortedlounges] = useState([]);

  const getLounges = async () => {
    const data = await getAlllounges(1);

    setlounges(data?.lounges);
    setsortedlounges(
      data?.openLounges?.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
    );
  };
  useEffect(() => {
    getLounges();
  }, []);
  
  
  const navigate = useNavigate();
  return (
    <section className="user-panel">
      <Container fluid>
        <div className="lounges">
          <Row>
            <Col md={6}>
              <h2>Lounges</h2>
              <p>Join an event or community to connect with others</p>
            </Col>
            <Col md={6}>
              <div className="tutorial-btn">
                <Link to={"/"}>Tutorial</Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className="lounges lounge-event">
          <Col md={6}>
            <h2>Lounge events</h2>
            <p>Ordered by date</p>
          </Col>
          <div className="lounge-cards">
            {lounges?.map((item, index) => {
              const month = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              const d = new Date(item.scheduling.scheduleDate.split("T")[0]);

              let date = month[d.getMonth()];
              let start = new Date(item.scheduling.startAt);
              let end = new Date(item.scheduling.endAt);

              start =
                (start.getHours() < 12
                  ? start.getHours()
                  : start.getHours() - 12) +
                ":" +
                start.getMinutes() +
                (start.getHours() < 12 ? "am" : "pm");
              end =
                (end.getHours() < 12 ? end.getHours() : end.getHours() - 12) +
                ":" +
                end.getMinutes() +
                (end.getHours() < 12 ? "am" : "pm");

              return (
                <div className="lounge-session">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/join_lounge/${item._id}`, { state: item });
                    }}
                    className="main-session ifjTYe"
                  >
                    <div
                      className="dTqEqv"
                      style={{
                        backgroundImage: `url( ${imageURL}${item?.banner})`,
                      }}
                    >
                      <div class="sc-dIUggk XavQL">
                        <div class="sc-hHftDr iKPSHA">
                          <span aria-hidden="true">{item.name}</span>
                          <span class="sc-crrsfI iDhzRL">{item.name}</span>
                        </div>
                        <span class="sc-jrAGrp dXWCyY" aria-hidden="true">
                          <svg height="22" viewBox="0 0 18 18">
                            <path
                              d="M7.10258 16.1026L9 18L18 9L9 0L7.10258 1.89742L12.8633 7.65812H0V10.3419H12.8633L7.10258 16.1026Z"
                              fill="#fff"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div class="sc-bkzZxe cSnsVU">
                      <div class="sc-idOhPF kGntgQ">
                        <div class="sc-iqHYGH hSaKRS sc-hBEYos dWjUC">
                          <div>
                            <span class="sc-crrsfI iDhzRL">
                              The event is on
                            </span>
                            <div class="sc-dQppl cQZIoF">
                              {
                                item.scheduling.scheduleDate
                                  .split("T")[0]
                                  .split("-")[2]
                              }
                            </div>
                            <div class="sc-bqyKva ehfErK">
                              <span class="sc-crrsfI iDhzRL">{date}</span>
                              <span aria-hidden="true">{date.slice(0, 3)}</span>
                            </div>
                          </div>
                        </div>
                        <div class="sc-iqHYGH hSaKRS sc-hBEYos dWjUC">
                          <div>
                            <div class="sc-kstrdz btjemE">
                              <span class="sc-crrsfI iDhzRL">
                                The event starts at{" "}
                              </span>
                              {start}
                            </div>
                            <div class="sc-kstrdz btjemE">
                              <span class="sc-crrsfI iDhzRL">
                                The event ends at{" "}
                              </span>
                              {end}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span class="sc-fubCfw bZSATy">
                          <span title="0 Guests" class="sc-pFZIQ fxgwrN">
                            {item.guests.length}
                          </span>{" "}
                          Guests
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lounges lounge-event communities">
          <Col md={6}>
            <h2>Lounge Communities</h2>
            <p>Ordered from A to Z</p>
          </Col>

          <div className="communities-card">
            {sortedlounges?.map((item, index) => {
              return (
                <div className="communities-content">
                  <Row>
                    <Col md={6}>
                      <h6>{item.name}</h6>
                      <p>{item.description}</p>
                    </Col>
                    <Col md={6} className="t-right">
                      <span class="sc-fubCfw dQkfXx">
                        <span title="2 Guests" class="sc-pFZIQ fxgwrN">
                          {item?.guests?.length}
                        </span>{" "}
                        Guests
                      </span>
                    </Col>
                  </Row>
                  <div className="guKkvw">
                    <img
                      src={imageURL + item.banner}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/join_lounge/${item._id}`, { state: item });
                      }}
                      alt="img"
                      className="sc-kfzAmx fTLfYv"
                    />
                    <span
                      class="sc-jrAGrp dXWCyY sc-fKFyDc nwOmR"
                      aria-hidden="true"
                    >
                      <svg height="22" viewBox="0 0 18 18">
                        <path
                          d="M7.10258 16.1026L9 18L18 9L9 0L7.10258 1.89742L12.8633 7.65812H0V10.3419H12.8633L7.10258 16.1026Z"
                          fill="#fff"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default User_panel;
