
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import { getUserFromJWT } from '../../utils/User';
import secureLocalStorage from 'react-secure-storage';
import { CircularProgress, Paper } from '@mui/material';

function Meeting() {
    const navigate = useNavigate()
    const activeRoom = secureLocalStorage.getItem('activeRoom')
    console.log(activeRoom)
    const user = getUserFromJWT()
    function SpinnerView() {
        return (
            <Paper sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px',
                height: '75vh',
            }} elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        );
      }
    return (
        <JaaSMeeting
            spinner={SpinnerView}
            appId={process.env.REACT_APP_JASS_MEETING_APP_ID}
            // domain = { domain }
            roomName={activeRoom?.cour?.titre}
            configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: true,
                enableEmailInStats: false,

            }}
            interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
                displayName: (user?.firstName.toUpperCase() + ' ' + user?.lastName.toUpperCase()) || 'Your_Name',


            }}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '600px'; }}

            onReadyToClose={(r) => {
                console.log('Meeting ended');
                navigate('/')
            }}

        />
    );
}


export default Meeting;
