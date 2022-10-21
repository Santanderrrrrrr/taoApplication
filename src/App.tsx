import { BrowserRouter, Routes, Route } from "react-router-dom";



import UploadProd from './components/uploadProd/UploadProd'
import ComingSoon from './components/comingSoon/ComingSoon'
import Login from './components/login/Login'


function App() {


  

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
