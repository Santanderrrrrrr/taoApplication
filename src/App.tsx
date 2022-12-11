// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from './context/appContext'



import UploadProd from './pages/uploadProd/UploadProd'
import ComingSoon from './pages/comingSoon/ComingSoon'
import Login from './pages/login/Login'
import PersProfilePage from './pages/profile/PersProfilePage'
import PlaygroundSpeedDial from './pages/navTool/PlaygroundSpeedDial'
import SettingsDrawer from './pages/settingDrawer/SettingsDrawer'
import Search from './pages/search/Search'


function App() {  

  const { currentUser } = useAppContext()

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd  />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<PersProfilePage/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
      {currentUser && <PlaygroundSpeedDial />}
      {currentUser && <SettingsDrawer />}
    </BrowserRouter>
  );
}

export default App;
