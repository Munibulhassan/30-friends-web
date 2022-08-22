import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { joinchat, joinmeeting } from "../../Action/action";
import { imageURL } from "../../Action/config";
import image from "../../Assets/default.png";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import { ThemeProvider } from "styled-components";
import { VideoTileGrid } from "amazon-chime-sdk-component-library-react";

const Joinroom = () => {
  const location = useLocation();
  const [data, setdata] = useState([]);
  const [roomid, setroomid] = useState("");
  const [meeting, setmeeting] = useState(false);
  const joiningchatandmeeting = async () => {
    const res = await joinchat(location.state.data._id)
    console.log(res)
    if(location.state.join==true){
      location.state.data.rooms.map(async (item)=>{
        if(item?.status == "open" && item.maxGuests == item.guests.length){
          const user = JSON.parse(localStorage.getItem("user"))._id
          const meetresponse = await joinmeeting(user,item.meeting.MeetingId)
          console.log(meetresponse)

        }
      })
    }
  }
  useEffect( () => {
    setdata(location.state.data.rooms);
    
    joiningchatandmeeting()
  }, []);
  const meetingManager = useMeetingManager();
  const meetingjoin = async (id) => {
    const res = await joinchat(id);
    console.log(id);

    // const data = await res.json();
    console.log(res);
    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      res.meeting,
      res.attendee
    );
    await meetingManager.join(meetingSessionConfiguration);
    await meetingManager.start();
    setmeeting(true);
  };
  
  return (
    <section className="join-lounge">
      <Col md={4}>
        <div className="conversationlist">
          {data?.map((item) => {
            return (
              <div className="room">
                <div className="roomimg">
                  {item?.guests[0]?.photo ? (
                    <img src={imageURL + item.guests[0].photo} />
                  ) : (
                    <img src={image} />
                  )}
                </div>
                <div className="roominfo">
                  <p>capacity:{" " + item.maxGuests}</p>
                  {item?.status == "open" ? (
                    <div className="status">
                      <span
                        className="statuscolor"
                        style={{ backgroundColor: "#52ec7d" }}
                      ></span>
                      <span
                        className="joinmeeting"
                        onClick={() => {
                          setroomid(item._id);
                          meetingjoin(location.state._id);
                        }}
                      >
                        join room
                      </span>
                    </div>
                  ) : (
                    <div className="status">
                      <span
                        className="statuscolor"
                        style={{ backgroundColor: "#5552ec" }}
                      ></span>
                      <span className="await">Awaiting</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Col>
      <Col md={8}>
        <div className="chat">
          {meeting == true ? (
            <>
              <VideoTileGrid />
              <p>Munib</p>
            </>
          ) : null}
        </div>
      </Col>
    </section>
  );
};

export default Joinroom;
