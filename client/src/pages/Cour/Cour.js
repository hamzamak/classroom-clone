import ExpandCard from "../../components/Cour/ExpandCard"
import { SnackbarProvider } from 'notistack';
import { Container } from "@mui/system";
import TabPanels from "../../components/Cour/TabPanels";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Paper } from "@mui/material";
import { getUserFromJWT } from "../../utils/User";

function Cour() {
    const navigate = useNavigate()
     const user = getUserFromJWT()
     const dispatch= useDispatch()

    useEffect(()=> {
        if(!user) navigate('/auth')
    },[dispatch])
    
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
        <SnackbarProvider maxSnack={2}>
            <Container maxWidth="lg" sx={{ marginTop: 5 }}>
                <ExpandCard />              
                <TabPanels />
            </Container>
        </SnackbarProvider>
    )
}

export default Cour