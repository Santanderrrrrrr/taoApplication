// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import UploadProd from './components/uploadProd/UploadProd'
import ComingSoon from './components/comingSoon/ComingSoon'
import Login from './components/login/Login'
import PersProfilePage from './components/profile/PersProfilePage'


function App() {  

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd  />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<PersProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
