import React, { useRef, useState } from 'react';



import * as Chime from 'amazon-chime-sdk-js';

function VideoCall() {
  const [meetingResponse, setMeetingResponse] = useState()
  const [attendeeResponse, setAttendeeResponse] = useState()
  const [callCreated, setCallCreated] = useState(false)
  const videoElement = useRef()
  
  const startCall = async () => { 

    // const response = await axios.get('http://localhost:5000/meeting')
    setMeetingResponse({
        "MeetingId": "a2017da3-4f2e-4437-8fed-83395ac70706",
        "ExternalMeetingId": "e975a4aa-f366-4a4d-81d1-eb79457789fd",
        "MediaPlacement": {
            "AudioHostUrl": "720d3e97cd1717a6df4f25a9bd2d2b46.k.m3.uw2.app.chime.aws:3478",
            "AudioFallbackUrl": "wss://haxrp.m3.uw2.app.chime.aws:443/calls/a2017da3-4f2e-4437-8fed-83395ac70706",
            "ScreenDataUrl": "wss://bitpw.m3.uw2.app.chime.aws:443/v2/screen/a2017da3-4f2e-4437-8fed-83395ac70706",
            "ScreenSharingUrl": "wss://bitpw.m3.uw2.app.chime.aws:443/v2/screen/a2017da3-4f2e-4437-8fed-83395ac70706",
            "ScreenViewingUrl": "wss://bitpw.m3.uw2.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=a2017da3-4f2e-4437-8fed-83395ac70706",
            "SignalingUrl": "wss://signal.m3.uw2.app.chime.aws/control/a2017da3-4f2e-4437-8fed-83395ac70706",
            "TurnControlUrl": "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
            "EventIngestionUrl": "https://data.svc.ue1.ingest.chime.aws/v1/client-events"
        },
        "MediaRegion": "us-west-2"
    })
    setAttendeeResponse({
        "ExternalUserId": "62b1bc6a3fe1f170e1fd1dea",
        "AttendeeId": "21268629-f70c-c865-dd76-7c36cc48b1c6",
        "JoinToken": "MjEyNjg2MjktZjcwYy1jODY1LWRkNzYtN2MzNmNjNDhiMWM2Ojg3MTE0M2U1LWMzZmQtNDAyNy05MmQ3LTAyYzQ5YjBjOTIwZQ"
    })
    setCallCreated(true)
  }

  const joinVideoCall = async () => { 
    const logger = new Chime.ConsoleLogger('ChimeMeetingLogs', Chime.LogLevel.INFO);
    const deviceController = new Chime.DefaultDeviceController(logger);
    const configuration = new Chime.MeetingSessionConfiguration(meetingResponse, attendeeResponse);
    const meetingSession = new Chime.DefaultMeetingSession(configuration, logger, deviceController);

    const observer = {
      audioVideoDidStart: () => {
        meetingSession.audioVideo.startLocalVideoTile();
      },
      videoTileDidUpdate: tileState => {
        meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement.current);
      }
    }

    meetingSession.audioVideo.addObserver(observer);
    console.log(await meetingSession.audioVideo.listVideoInputDevices())
    const firstVideoDeviceId = (await meetingSession.audioVideo.listVideoInputDevices())[0]?.deviceId;
    meetingSession.audioVideo.startLocalVideoTile();
    await meetingSession.audioVideo.chooseVideoInputDevice(firstVideoDeviceId);
    // meetingSession.audioVideo.start();
  }

  return (
    <div className="VideoCall">
      <header className="VideoCall-header">
        <video ref={videoElement}></video>
        <button disabled={!callCreated} onClick={joinVideoCall}> join call</button>
        <button onClick={startCall}>start call</button>
      </header>
    </div>
  );
}

export default VideoCall;