import { Avatar, IconButton, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { add_comment } from '../../actions/comments';
function SendCommentBox({user , idChapitre,activeRoom}) {
  const [comment,setComment]= useState('')
  const dispatch = useDispatch()
  const sendComment=()=> {
    dispatch(add_comment({idRoom:activeRoom?._id,idChapitre,content:comment,idUser: user?._id}))
    setComment('')
  }
  return (
    <Paper sx={{borderRadius : 3,justifyContent: 'space-between', display: 'flex', alignItems: "center", pl: 1,pr:1,p:1.2,  mb: 2,maxHeight:60}} elevation={4} >
       <Box sx={{ display: 'flex', alignItems: "baseline",width:"100%",pl:2  }}  >
        
        <Avatar sx={{ bgcolor: "brown", mr: 3 }}>{user?.firstName.charAt(0).toUpperCase()}</Avatar>

        <TextField
          id="filled-search"
          label="Ajouter des Commentaires"
          type="text"
          variant="standard"
          sx={{ width:"100%",paddingBlock:1}}
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
        />
       </Box>
       <IconButton disabled={!comment ? true : false} onClick={sendComment}>
          <SendIcon color={comment ? "primary" :"disabled" } />

       </IconButton>
    </Paper>
  )
}

export default SendCommentBox