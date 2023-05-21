import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Infos from './Infos'
import Chapitre from './Chapitre'
import no_data from '../../images/no_data.png'
import secureLocalStorage from 'react-secure-storage'
import StartMeeting from './StartMeeting'

function Chapitres({ setCurrentChapId, setValue }) {
  const activeRoom = secureLocalStorage.getItem('activeRoom')

  return (
    <Grid container columnSpacing={8} rowSpacing={2}>
      <Grid item xs={12} md={4} >
        <Infos />
        <StartMeeting/>
      </Grid>
      <Grid item xs={12} md={8} >
        {activeRoom.chapitres.length > 0 ?
          activeRoom.chapitres.slice().reverse().map((chapitre) => (
            <Chapitre key={chapitre._id} chapitre={chapitre} setCurrentChapId={setCurrentChapId} setValue={setValue} />
          ))
          : (
            <Box alignItems="center" display="flex" flexDirection="column"  >
              <img src={no_data} style={{ maxWidth: "50%", }} alt="aucune chapitre a ete cree" />
              <Typography style={{ fontFamily: 'Nunito' }} variant="h5">Ajouter des chapitres</Typography>
            </Box>
          )}

      </Grid>

    </Grid>
  )
}

export default Chapitres