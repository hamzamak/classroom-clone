import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import meeting from '../../images/meeting.png'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function StartMeeting() {
  const navigate = useNavigate()
  const start_join_Meeting = () => {
  navigate('/meet')
  }
  return (
    <Card sx={{ minWidth: 275, borderRadius :2, mt:2 }} elevation={5}>
      <CardContent>
        <div style={{display:'flex',flexDirection:'row'}}>
          <img src={meeting} width={30} height={30} />
        <Typography variant="h6" component="p" sx={{  fontFamily : "Nunito",ml:1.5  }} >
         Meeting
        </Typography>
        </div>

        <Button variant='contained' color='success' fullWidth sx={{mt:1.5}} onClick={start_join_Meeting}>
          Join
        </Button>
      </CardContent>
    </Card>
  );
}
