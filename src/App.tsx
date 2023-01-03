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
import UserProf from './pages/foundItems/users/UserProf'
import Product from "./pages/foundItems/products/Product"
import Feed from "./pages/feed/Feed"


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
        <Route path='/u/:userId' element={<UserProf/>} />
        <Route path='/p/:productId' element={<Product/>} />
        <Route path='/feed' element={<Feed/>} />
      </Routes>
      {currentUser && <PlaygroundSpeedDial />}
      {currentUser && <SettingsDrawer />}
    </BrowserRouter>
  );
}

export default App;
