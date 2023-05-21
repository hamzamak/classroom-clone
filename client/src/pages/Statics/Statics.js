import { CircularProgress, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import Groups2Icon from '@mui/icons-material/Groups2';
import PaperData from '../../components/Statics/PaperData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EnhancedTable from '../../components/Statics/EnhancedTable';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { useSelector } from 'react-redux';
import { getUserFromJWT } from '../../utils/User';

function Statics() {

   const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem('user'))
   const user = getUserFromJWT()
   const activeRoom = secureLocalStorage.getItem('activeRoom')

   const NbrEtudiants = activeRoom?.etudiants?.length
   const NbrChapites = activeRoom?.chapitres?.length


   const Pourcentage_Consultation = () => {
      if (activeRoom?.etudiants.length === 0) return 0;
      const sum = activeRoom?.etudiants.map(e => e.chapitresConsultees.length).reduce((prev, curr) => prev + curr, 0);
      if (sum === 0) return 0;
      return ((sum / (NbrEtudiants * NbrChapites)) * 100).toFixed(2);

   }

   React.useEffect(() => {
      if (!user) navigate('/auth')
      if (!activeRoom) navigate('/')
   })


   const { isLoading } = useSelector(state => state.roomReducers)

   if (isLoading) {
      return <Paper sx={{
         display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px',
         height: '39vh',
      }} elevation={6}>
         <CircularProgress size="7em" />
      </Paper>
   }
   return (
      <Container maxWidth='xl'>
         <Typography variant='h5' sx={{ padding: 2, fontFamily: 'Nunito', fontStyle: 'italic', display: "flex", alignItems: "center" }}>Statistiques <TrendingUpIcon fontSize='large' color="primary" /></Typography>
         <Grid container spacing={2}    >
            <Grid item xs={12} sm={12} md={6} lg={3}  >
               <PaperData color="blue" data={NbrEtudiants} title="Nombre Des Etudiants" icon={<Groups2Icon fontSize='large' color='disabled' />} />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={3}>
               <PaperData color="green" data={NbrChapites} title="Nombre Des Chapitres" icon={<FolderCopyIcon fontSize='large' color='disabled' />} />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={3}>
               <PaperData color="red" data={Pourcentage_Consultation()} value={Pourcentage_Consultation()} title="Totals Consultations" displayProgress={true} icon={<DoneAllIcon fontSize='large' color='disabled' />} />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={6} lg={3}>
               <PaperData color="#9c27b0" data={14} title="Etudiants En Ligne" icon={<Groups2Icon fontSize='large' color='disabled' />} />
            </Grid> */}

         </Grid>

         <EnhancedTable activeRoom={activeRoom} />


      </Container>
   )
}

export default Statics