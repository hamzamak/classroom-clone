import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cour from "./pages/Cour/Cour";
import Rooms from "./pages/Room/Rooms";
import Navbar from "./components/NavBar/NavBar";
import { Container } from "@mui/material";
import Statics from "./pages/Statics/Statics";
import Auth from './components/Login/Auth';
import DetailChapitre from './components/Cour/DetailChapitre';

function App() {
  return (

    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/auth' exact element={ <Auth/>  }/>
          {/* 
           //  option - replace
          //  Normally a call to navigate will push a new entry into the history stack so the user can click the back button to get back to the page. If you pass replace:
         //   true to navigate then the current entry in the history stack will be replaced with the new one.  */}    
          <Route path='/' element={<Navigate /*replace*/ to="/cours" />} />
          <Route path="/cours" element={<Rooms />} />
          <Route path="/cours/search" element={<Rooms />} />
          <Route path="/active_cour/chaptire/:id" element={<DetailChapitre />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/active_cour" element={<Cour />} />
          <Route path="*" element={<Navigate /*replace*/ to="/cours" />} />
          {/* ajouter path="*" et si le cas dirige vers page introuvable ou auth  */}
        </Routes>
        <div style={{marginBottom : 20}}></div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
