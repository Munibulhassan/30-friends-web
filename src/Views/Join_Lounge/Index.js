import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import chaticon from "../../Assets/chat.png";
import hand from "../../Assets/hand.png";
import Carousel from "carousel-react-rcdev";
import tf_ad from "../../Assets/tf-ad.png";
import { useEffect, useRef, useState } from "react";
import image from "../../Assets/default.png";
import {
  getSinglelounges,
  joinchat,
  joinmeeting,
  voteicebreakers,
} from "../../Action/action";
import { imageURL } from "../../Action/config";

import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import {
  MeetingProvider,
  lightTheme,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";

import { ThemeProvider } from "styled-components";
// import { SdkPrimaryMeetingJoinAckFrame } from "amazon-chime-sdk-js/build/signalingprotocol/SignalingProtocol";

const MyMeetingView = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <VideoTileGrid />
      </MeetingProvider>
    </ThemeProvider>
  );
};
function Join_lounge() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [date, setdate] = useState("");
  const [month, setmonth] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [checkforchat, setcheckforchat] = useState(false);
  const [video, setvideo] = useState(false);
  // const [connectiontime, setconnectiontime] = useState("");
  const Ref = useRef(null);

  useEffect(() => {
    async function getlounge() {
      const loungedata = await getSinglelounges(
        location.pathname.split("/")[2]
      );
      setdata(loungedata);
    }
    getlounge();

    // clearTimer(loungedata?.chatCycle * 60);
  }, []);

 
  useEffect(() => {
    const d = new Date(data?.scheduling.scheduleDate.split("T")[0]);
    setdate(data?.scheduling.scheduleDate.split("T")[0].split("-")[2]);
    const months = [
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

    setmonth(months[d.getMonth()]);
    let start = new Date(data?.scheduling.startAt);
    let end = new Date(data?.scheduling.endAt);

    setstart(
      (start.getHours() < 12 ? start.getHours() : start.getHours() - 12) +
        ":" +
        start.getMinutes() +
        (start.getHours() < 12 ? "am" : "pm")
    );
    setend(
      (end.getHours() < 12 ? end.getHours() : end.getHours() - 12) +
        ":" +
        end.getMinutes() +
        (end.getHours() < 12 ? "am" : "pm")
    );
    var currentDate = new Date();
    const connection = new Date(
      currentDate?.getTime() + data?.chatCycle * 60000
    );
    // setconnectiontime(connection.getHours() +":"+connection.getMinutes() )
    // setconnectiontime(JSON.stringify(connection)?.split("T")[1]?.slice(0, 5));
  }, [data]);

  const chatjoin = async (id) => {

    const result = await joinchat(id);
console.log(result)
    if(result.statusCode == 404 || result.statusCode == 400){
      alert(result.message)
    }else{
if(result.Meeting){

  const meetingManager = useMeetingManager();
  // const meetingdata = await joinmeeting(user, item.Meeting.meeting.MeetingId);
  const meetingSessionConfiguration = new MeetingSessionConfiguration(
    result.Meeting.meeting,
    result.Meeting.attendee
  );
  await meetingManager.join(meetingSessionConfiguration);
  await meetingManager.start();
  setvideo(true);

}
      // result?.lounge?.rooms?.map(async (item) => {
      //   if (item.status == "open") {
      //   }
      // });
    }


  };
  const icebreakerVote = async (status, index) => {
    const user = JSON.parse(localStorage.getItem("user"))._id;

    const value = data;
    const res = await voteicebreakers(data._id, status);

    if (status == true) {
      value?.icebreakers[index].upVotes.push(user);
      value?.icebreakers[index].downVotes.splice(
        value?.icebreakers[index]?.downVotes.indexOf(user),
        1
      );
    } else {
      value?.icebreakers[index]?.upVotes?.splice(
        value?.icebreakers[index]?.upVotes.indexOf(user),
        1
      );
      value?.icebreakers[index]?.downVotes?.push(user);
    }

    setdata(value);
  };

  return (
    <section className="join-lounge">
      <Container>
        <Col md={12}>
          <Link to={"/User_panel"} className="home">
            Home
          </Link>
        </Col>
      </Container>
      <Container className="px-0">
        <Row>
          <Col md={8}>
            <div
              className="lounge-dash eElQyU"
              style={{ backgroundImage: `url(imageURL+ data?.banner )` }}
            >
              <div class="sc-gVgnHT bfDGHw">
                <div class="sc-iqHYGH hSaKRS sc-fWPcDo cgpajZ">
                  <div>
                    <span class="sc-crrsfI iDhzRL">The event is on</span>
                    <div class="sc-dQppl cQZIoF">{date}</div>
                    <div class="sc-bqyKva ehfErK">
                      <span class="sc-crrsfI iDhzRL">{month}</span>
                      <span aria-hidden="true">{month?.slice(0, 3)}</span>
                    </div>
                  </div>
                </div>
                <div class="sc-iqHYGH hSaKRS sc-fWPcDo cgpajZ">
                  <div>
                    <div class="sc-kstrdz btjemE">
                      <span class="sc-crrsfI iDhzRL">The event starts at </span>
                      {start}
                    </div>
                    <div class="sc-kstrdz btjemE">
                      <span class="sc-crrsfI iDhzRL">The event ends at </span>
                      {end}
                    </div>
                  </div>
                </div>
              </div>{" "}
              <span class="sc-fubCfw bZSATy">
                <span title="1 Guest" class="sc-pFZIQ fxgwrN">
                  {data?.guests?.length}
                </span>{" "}
                Guest
              </span>
            </div>
            <div class="sc-kUbhmq jEqguw">
              <div class="sc-iGctRS fpSvqg">
                <div class="sc-fHYxKZ dnKCVK">
                  <div class="sc-gyUeRy fFXEDN">
                    <h1 class="sc-gkdzZj iaEQQ">{data?.name}</h1>

                    <div class="sc-flMoUE cVXkCl">
                      {data?.status == "active" ? (
                        <>
                          <div
                            width="8"
                            style={{ backgroundColor: "rgb(0, 235, 136)" }}
                            class="sc-tYoTV rcpjK sc-eWVKcp hqFZpw"
                            aria-label="Green status indicator"
                          ></div>
                          Lounge Open
                        </>
                      ) : (
                        <>
                          <div
                            width="8"
                            style={{ backgroundColor: "rgb(237, 19, 19)" }}
                            class="sc-tYoTV rcpjK sc-eWVKcp hqFZpw"
                            aria-label="Green status indicator"
                          ></div>
                          Lounge Closed
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      class="sc-eCssSg bnCIin sc-irlOZD jUdyne"
                      color="red"
                      onClick={() => navigate("/User_panel")}
                    >
                      Leave Lounge
                    </button>
                  </div>
                </div>
                <p class="sc-dlfnbm fkJzdG">Computer Science Mixer</p>
                <span class="sc-crrsfI iDhzRL">Computer Science Mixer</span>
              </div>
              <div class="sc-kYrkKh fcJagU">
                <div class="sc-xyEjG cPUXYV">
                  <span
                    class="sc-GTWni iidWQZ"
                    height="70"
                    width="70"
                    aria-hidden="false"
                  >
                    <svg
                      class=""
                      fill="#495057"
                      width="70px"
                      height="70px"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </span>
                </div>
                <div class="sc-fHuLdG ktbFdU">
                  <div class="sc-dtTInj cEBhgE">
                    <p class="sc-dlfnbm fkJzdG sc-euMpXR cBZIGQ">
                      new connection every {data?.chatCycle} minutes
                    </p>
                    <div class="sc-dkIXFM fkyVgZ">
                      <p class="sc-dlfnbm fkJzdG sc-euMpXR cBZIGQ">
                        next connection:
                      </p>
                      <div class="sc-XhUPp kiNLFp">
                        {timer}
                        <span class="sc-ikPAkQ ceimHt">
                          {/* 4<span class="sc-crrsfI iDhzRL"> minutes and</span>
                          <span aria-hidden="true">:</span>48
                          <span class="sc-crrsfI iDhzRL"> seconds</span> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sc-dWdcrH fkeSst">
                <div class="sc-Fyfyc fTMjUf">
                  <button
                    class="sc-eCssSg cgGnME sc-jXktwP hdiogm"
                    color="blue"
                    onClick={() => {
                      chatjoin(data?._id);
                    }}
                  >
                    Join next chat
                  </button>
                  <button
                    class="sc-eCssSg bnCIin sc-jXktwP hdiogm"
                    color="red"
                    onClick={() => setcheckforchat(!checkforchat)}
                  >
                    Check for current chats
                  </button>
                </div>
              </div>
            </div>
            {checkforchat ? (
              <Carousel>
                {data?.rooms?.map((item) => {
                  return (
                    <div className="room">
                      {item?.guests[0]?.photo ? (
                        <img src={imageURL + item.guests[0].photo} />
                      ) : (
                        <img src={image} />
                      )}
                      <p>capacity:{" " + item.maxGuests}</p>
                      {item?.status == "open" ? (
                        <div>
                          <span
                            className="statuscolor"
                            style={{ backgroundColor: "#52ec7d" }}
                          ></span>
                          <span
                            className="joinmeeting"
                            onClick={() => {
                              meetingjoin(id);
                            }}
                          >
                            join room
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span
                            className="statuscolor"
                            style={{ backgroundColor: "#5552ec" }}
                          ></span>
                          <span className="await">Awaiting</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Carousel>
            ) : null}
            {/* lounge persons  */}
            <div class="sc-iBPRYJ yXCYH sc-fxNNfJ dcHbyY">
              <div class="sc-dwcuIR jktQCG">
                <span class="sc-jtHMlw fzYzV">
                  <span class="sc-fubCfw dQkfXx sc-fXvjs endHJt">
                    <span title="1 Guest" class="sc-pFZIQ fxgwrR">
                      {data?.guests?.length}
                    </span>
                  </span>{" "}
                  In the lounge
                </span>
              </div>
              <div class="sc-gYhigD gdlclw">
                {data?.guests?.map((item) => {
                  return (
                    <div
                      role="button"
                      tabindex="0"
                      title="Austin, open sidebar profile"
                      aria-label="Austin, open sidebar profile"
                      class="sc-bGqQkm jyZRYv"
                    >
                      <div class="sc-biBrSq rrVpB">
                        <span
                          class="sc-GTWni dHVACP sc-eHfQar hhRQON"
                          height="50px"
                          width="50px"
                          aria-hidden="true"
                        >
                          <img
                            src={imageURL + item.photo}
                            className="guestimg"
                          />
                        </span>
                        <span class="sc-hzMMCg kKpKzb">
                          <small>{item.userName}</small>
                        </span>
                        <span class="sc-crrsfI iDhzRL">{item.userName}</span>
                        <div
                          width="8"
                          class="sc-tYoTV rcpjK"
                          aria-label="Green status indicator"
                        ></div>
                      </div>
                    </div>
                  );
                })}
                {/* {data?.guests?.map((item))} */}
              </div>
            </div>

            {/* lounge persons END */}

            {/* info tags  */}
          </Col>
          <Col md={4}>
            {/* vote board  */}
            <div className="vote-board yXCYH">
              <div className="voting">
                <Row>
                  <Col md={4} className="px-0">
                    <div className="vote-icon">
                      <span aria-hidden="true" class="sc-cjHJEj beWCdN">
                        <svg height="24" viewBox="0 0 24 24" width="24">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path>
                        </svg>
                      </span>
                      <h6>Vote</h6>
                    </div>
                  </Col>
                  <Col md={4} className="px-0">
                    <div className="vote-icon">
                      <span aria-hidden="true" class="sc-cjHJEj ecPmVd">
                        <svg height="24" viewBox="0 0 24 24" width="24">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path>
                        </svg>
                      </span>
                      <h6>Suggest</h6>
                    </div>
                  </Col>
                  <Col md={4} className="px-0">
                    <div className="vote-icon">
                      <span aria-hidden="true" class="sc-cjHJEj ecPmVd">
                        <svg width="27" height="24" viewBox="0 0 27 24">
                          <path d="M7.33333 24H0V8H7.33333V24ZM17 0H9.66667V24H17V0ZM26.6667 10.6667H19.3333V24H26.6667V10.6667Z"></path>
                        </svg>
                      </span>
                      <h6>Favorites</h6>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="vote-fav">
                <small>Vote for your favorite icebreakers.</small>
                {data?.icebreakers?.map((item, index) => {
                  return (
                    <div class="icebreaker-vote">
                      <div className="vote-tag">
                        <p> {item.name}</p>
                      </div>
                      <div class="sc-BXqHe bwSTre">
                        {item?.downVotes?.includes(
                          JSON.parse(localStorage.getItem("user"))?._id
                        ) ? (
                          <button class="sc-bTRMAZ disableunlike" disabled>
                            <svg
                              width="17"
                              height="15"
                              viewBox="0 0 17 15"
                              fill="none"
                              aria-label="Down vote"
                            >
                              <path
                                d="M17 0L13.9091 -2.70216e-07L13.9091 9L17 9L17 0ZM5.90104e-07 8.25C5.1798e-07 9.075 0.695456 9.75 1.54546 9.75L6.42136 9.75L5.68727 13.1775L5.66409 13.4175C5.66409 13.725 5.79546 14.01 6.00409 14.2125L6.82318 15L11.9077 10.0575C12.1936 9.7875 12.3636 9.4125 12.3636 9L12.3636 1.5C12.3636 0.675001 11.6682 -4.66122e-07 10.8182 -5.40432e-07L3.86364 -1.14842e-06C3.22227 -1.20449e-06 2.67364 0.375 2.44182 0.915L0.108182 6.2025C0.0386379 6.375 7.38285e-07 6.555 7.21238e-07 6.75L5.90104e-07 8.25Z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        ) : (
                          <button
                            class="sc-bTRMAZ kGehDO"
                            onClick={() => icebreakerVote(false, index)}
                          >
                            <svg
                              width="17"
                              height="15"
                              viewBox="0 0 17 15"
                              fill="none"
                              aria-label="Down vote"
                            >
                              <path
                                d="M17 0L13.9091 -2.70216e-07L13.9091 9L17 9L17 0ZM5.90104e-07 8.25C5.1798e-07 9.075 0.695456 9.75 1.54546 9.75L6.42136 9.75L5.68727 13.1775L5.66409 13.4175C5.66409 13.725 5.79546 14.01 6.00409 14.2125L6.82318 15L11.9077 10.0575C12.1936 9.7875 12.3636 9.4125 12.3636 9L12.3636 1.5C12.3636 0.675001 11.6682 -4.66122e-07 10.8182 -5.40432e-07L3.86364 -1.14842e-06C3.22227 -1.20449e-06 2.67364 0.375 2.44182 0.915L0.108182 6.2025C0.0386379 6.375 7.38285e-07 6.555 7.21238e-07 6.75L5.90104e-07 8.25Z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        )}
                        {item?.upVotes?.includes(
                          JSON.parse(localStorage.getItem("user"))?._id
                        ) ? (
                          <button class="sc-fTABeZ disablelike" disabled>
                            <svg
                              width="17"
                              height="15"
                              viewBox="0 0 17 15"
                              fill="none"
                              aria-label="Up vote"
                            >
                              <path
                                d="M0 15H3.09091L3.09091 6H0L0 15ZM17 6.75C17 5.925 16.3045 5.25 15.4545 5.25L10.5786 5.25L11.3127 1.8225L11.3359 1.5825C11.3359 1.275 11.2045 0.99 10.9959 0.7875L10.1768 0L5.09227 4.9425C4.80636 5.2125 4.63636 5.5875 4.63636 6L4.63636 13.5C4.63636 14.325 5.33182 15 6.18182 15L13.1364 15C13.7777 15 14.3264 14.625 14.5582 14.085L16.8918 8.7975C16.9614 8.625 17 8.445 17 8.25V6.75Z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        ) : (
                          <button
                            class="sc-fTABeZ hsqAaa"
                            onClick={() => icebreakerVote(true, index)}
                          >
                            <svg
                              width="17"
                              height="15"
                              viewBox="0 0 17 15"
                              fill="none"
                              aria-label="Up vote"
                            >
                              <path
                                d="M0 15H3.09091L3.09091 6H0L0 15ZM17 6.75C17 5.925 16.3045 5.25 15.4545 5.25L10.5786 5.25L11.3127 1.8225L11.3359 1.5825C11.3359 1.275 11.2045 0.99 10.9959 0.7875L10.1768 0L5.09227 4.9425C4.80636 5.2125 4.63636 5.5875 4.63636 6L4.63636 13.5C4.63636 14.325 5.33182 15 6.18182 15L13.1364 15C13.7777 15 14.3264 14.625 14.5582 14.085L16.8918 8.7975C16.9614 8.625 17 8.445 17 8.25V6.75Z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* <img src={fav_tag} alt="img" /> */}
              </div>
            </div>
            {/* vote board END */}

            {/* Leaderboard  */}
            <div className="leaderboard yXCYH">
              <Col md={12}>
                <div className="leader-head">
                  <span>
                    {" "}
                    <img src={chaticon} alt="icon" />
                  </span>{" "}
                  <span>Chat Box</span>
                </div>
                <div className="chat-app">
                  <p>
                    You entered the chat. Say hi!{" "}
                    <span>
                      <img src={hand} alt="icon" />
                    </span>
                  </p>
                  <div className="chat-msg1">
                    <h6>Joseff</h6>
                    <h5>Hey! I'm Joseff, nice to meet u!</h5>
                  </div>
                  <div className="chat-msg1 chat-msg2">
                    <h6>Elora</h6>
                    <h5>Heyy what's up?</h5>
                  </div>
                  <div className="chat-msg1 chat-msg2 chat-msg3">
                    <h6>You</h6>
                    <h5>Nice to meet you too!</h5>
                  </div>
                  <div className="typing">
                    <span className="dark"></span>
                    <span className="lighter"></span>
                    <span className="lightest"></span>
                  </div>
                  <div className="send-msg">
                    <InputGroup className="mb-3">
                      <Form.Control placeholder="Write Something..." />
                      <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        type="submit"
                      >
                        <i class="fa-solid paper-plane "></i>
                        {/* <FontAwesomeIcon icon={solid('paper-plane')} /> */}
                      </Button>
                    </InputGroup>
                  </div>
                </div>
                <div className="inst">
                  <p>
                    On average our top users connect with 3 new friends per hour
                    of time online!
                  </p>
                </div>
              </Col>
            </div>
            {/* Leaderboard END */}
            {/* ad  */}
            <Col md={12}>
              <div className="ad">
                <img src={tf_ad} alt="img" />
              </div>
            </Col>
            {/* ad END */}
          </Col>
        </Row>
      </Container>
      {video ? (
        <Container>
          <Row>
            <Col md={12}>
              <p>Meeting Start</p>
              <MyMeetingView />
            </Col>
          </Row>
        </Container>
      ) : null}
    </section>
  );
}

export default Join_lounge;
