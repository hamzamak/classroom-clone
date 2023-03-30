import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import React from 'react'
import * as CustomStyles from './styles'
import moment from 'moment'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux'
import {getRoom} from '../../../../actions/rooms'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'

function Post({room , setCurrentId}) {
 const user = JSON.parse(localStorage.getItem('user'))
const dispatch= useDispatch()
const navigate = useNavigate()
  const navigateToRoom =()=>{
     dispatch(getRoom(room._id))
     navigate('/active_cour')
  }
 
  return (
    <Card sx= {{...CustomStyles.card}} raised elevation={6}>
      <CardMedia sx= {{...CustomStyles.media}} image={room?.cour?.theme || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
      title={room.cour.titre} onClick={navigateToRoom} style={{cursor:'pointer'}} />

      <div style= {{...CustomStyles.overlay}}>
        <Typography variant="h6">{room?.cour?.titre}</Typography>
        <Typography variant="body2">{moment(room?.createdAt).fromNow()}</Typography>
      </div>
      <div style= {{...CustomStyles.overlay2}}>
        {(user?.result?.isProfesseur ) && (

          <Button sx={{color : 'white'}} size="medium" onClick={() =>{}}>
            <Tooltip title="modifier votre cour"  onClick={() => setCurrentId(room.cour._id)}>
              <EditIcon fontSize="medium"  />
            </Tooltip>
          </Button>

        )}
      </div>
      <div style= {{...CustomStyles.details}}>
        <Typography variant="body2" color="textSecondary" component="h2">{room.cour.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{room.cour.description  ? 
        (room.cour.description.length>= 61? room.cour.description.substring(0,60) +"..." : room.cour.description) : "pas de description" }</Typography>
      </CardContent>
    <CardActions sx= {{...CustomStyles.cardActions}}>
        <Button size="small" color="primary" sx={{alignItems:"center" , display: "flex"}}   onClick={navigateToRoom}>
          <VisibilityIcon fontSize="medium" sx={{mr : 1}} /> 
          <p>Consulter</p> 
        </Button>
    </CardActions>
  </Card>
  )
}

export default Post