AWS.config.credentials = new AWS.credentials("AKIAVHXT126H3S5INV7","ZbdLcXtTmdhRvUN5C0aOZzKut7eI3+IVRvG7Dvds",null)
const chime = new AWS.chime({region:"us-east-1"})
chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com/console")
// create Meeting
const meeting = await chime.createMeeting({
    ClientRequestToken :"",
    MediaRegion:"",
    NotificationsConfiguration:{
        SqsQueueAm:"",
        SnsTopicArn:"",
    }
}).promise()
//creatr attemdee
const attendee = await chime.createAttendee({
    Meetingid: meeting.Meetingid,
    ExternalUserid :externalUserid,
}).promise();

//setting up the meeting session 
const config = new MeetingSessionConfiguration(
    createMeetingResponse,createAttendeeResponse
);
const logger = new console.Logger("SDK",LogLevel.DEBUG);
const deviceController = new DefaultDeviceController(logger);
const meetingSession = new DefaultMeetingSession(config,logger,deviceController);
const audioVideo = meetingSession.audioVideo;



// Registering for callbacks and starting audio-video
audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(handler)
audioVideo.realtimeSubscribeToVolumeIndicator(attendeeid,callback)
audioVideo.addDeviceChangeObserver(this)
audioVideo.addObserver(this)
audioVideo.start();
const audioVideoDidStart=()=>{
    await this.audioVideo.startLocalVideoTile();
}


