// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from './context/appContext'



import UploadProd from './components/uploadProd/UploadProd'
import ComingSoon from './components/comingSoon/ComingSoon'
import Login from './components/login/Login'
import PersProfilePage from './components/profile/PersProfilePage'
import PlaygroundSpeedDial from './components/navTool/PlaygroundSpeedDial'


function App() {  

  const { currentUser } = useAppContext()

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd  />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<PersProfilePage/>} />
      </Routes>
      {currentUser && <PlaygroundSpeedDial />}
    </BrowserRouter>
  );
}

export default App;
