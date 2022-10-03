import { BrowserRouter, Routes, Route } from "react-router-dom";



import UploadProd from './components/uploadProd/UploadProd'
import ComingSoon from './components/comingSoon/ComingSoon'


function App() {


  

  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path='/new' element={<UploadProd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
