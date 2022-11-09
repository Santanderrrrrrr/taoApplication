import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import UploadProd from './components/uploadProd/UploadProd'
import ComingSoon from './components/comingSoon/ComingSoon'
import Login from './components/login/Login'
import PersProfilePage from './components/profile/PersProfilePage'


function App() {

  const [accessToken, setAccessToken] = useState<string>('')
  const [persId, setPersId] = useState<string>('')


  

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd accessToken={accessToken} setAccessToken={setAccessToken} persId={persId} />} />
        <Route path='/login' element={<Login setAccessToken={setAccessToken} setPersId={setPersId} accessToken={accessToken}/>} />
        <Route path='/profile' element={<PersProfilePage accessToken={accessToken} setAccessToken={setAccessToken} persId={persId} setPersId={setPersId}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
