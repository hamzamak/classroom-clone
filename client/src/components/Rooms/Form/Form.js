import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import * as CustomStyles from './styles'
import SendIcon from '@mui/icons-material/Send';
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, joinRoom } from '../../../actions/rooms';
import { updateCour } from '../../../actions/cours';
import { getUserFromJWT } from '../../../utils/User';


function Form({ currentId, setCurrentId }) {
  const user = getUserFromJWT()

  const room = useSelector((state) => (currentId ? state.roomReducers.rooms.find((room) => room.cour._id === currentId) : null));
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({ titre: '', description: '', tags: [],  code_room : '', userId: user?._id, isProfesseur:user?.isProfesseur });
  const [errorTitre , setError] = useState("")

   useEffect(() => {
    if (room) setPostData({...postData,titre: room?.cour?.titre, description:  room?.cour?.description, tags:  room?.cour?.tags});
  }, [room]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ ...postData, titre: '', description: '', tags: [],code_room : '' });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(postData.titre.trim() ==="" && user?.isProfesseur ){
      setError('titre est obligatoire')
    }
    else {
      setError('')
      if(user?.isProfesseur){
        if (currentId === 0)  dispatch(createRoom(postData)) 
        else dispatch(updateCour(  currentId ,  postData))
      }

      else {
        dispatch(joinRoom(postData))
      }
  
      clear();
    }
  };
  
  return (
    <Paper elevation={6} sx= {{...CustomStyles.paper }}>
      <form autoComplete="off" noValidate  sx= {{...CustomStyles.form , ...CustomStyles.root  }}>
        <Typography variant="h6" sx={{...CustomStyles.headTypography}}>{ user?.isProfesseur ? ( currentId ? `Editing "${room?.cour?.titre}"` : 'Creating a Cour') : 'Rejoindre un cour'} </Typography>
        {
          user?.isProfesseur ? (
            <> 
            <TextField name="titre" variant="outlined" required label="title" fullWidth value={postData.titre} onChange={(e) => setPostData({ ...postData, titre: e.target.value })} margin="dense" helperText={errorTitre} error={errorTitre ? true : false}  />
            <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={3} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} margin="dense"  />
            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} margin="dense"  />
            
             </>
          )
          :
          (
            <TextField name="code_cour" variant="outlined" label="Code Du Cour" fullWidth value={postData.code_room} onChange={(e) => setPostData({ ...postData, code_room: e.target.value })} margin="dense" required={true} />

          )
        }
        
        <Button  variant="contained" color="primary" size="medium" type="submit" sx= {{...CustomStyles.btn}} className='gradient-custom' fullWidth endIcon={<SendIcon fontSize="inherit"/>} onClick={handleSubmit}>{ currentId ? 'Update' : "Submit"}</Button>
        <Button variant="contained" color="secondary" size="medium" onClick={clear}  sx= {{...CustomStyles.btn}}  fullWidth endIcon={<CachedIcon  fontSize="inherit"/>} >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
