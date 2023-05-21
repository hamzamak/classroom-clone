import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cour from "./pages/Cour/Cour";
import Rooms from "./pages/Room/Rooms";
import Navbar from "./components/NavBar/NavBar";
import { Container } from "@mui/material";
import Statics from "./pages/Statics/Statics";
import Auth from './components/Login/Auth';
import DetailChapitre from './components/Cour/DetailChapitre';
import Meeting from './pages/Meeting/Meeting';

function App() {
  return (

    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/auth' exact element={ <Auth/>  }/>
        
          <Route path='/' element={<Navigate  to="/cours" />} />
          <Route path="/cours" element={<Rooms />} />
          <Route path="/cours/search" element={<Rooms />} />
          <Route path="/active_cour/chaptire/:id" element={<DetailChapitre />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/active_cour" element={<Cour />} />
          <Route path="/meet" element={<Meeting/>} exact />
          <Route path="*" element={<Navigate to="/cours" />} />
      
        </Routes>
        <div style={{marginBottom : 20}}></div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
