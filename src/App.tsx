import React, { useState } from 'react';
import logo from './assets/logo.png'
import './css/App.css'
import { Stack } from '@mui/material'
import Texts from './components/Texts';
import SwipeableEdgeDrawer from './components/SwipeableEdgeDrawer'


// const recycleBin = ()=>{
//   return 
//     {
//       const handleChange: () => {
//         setChecked((prev) => !prev);
//       };
//      const checkedButton = `<FormControlLabel
//                 control={<Switch checked={checked} onChange={handleChange} />}
//                 label="Show"
//                 sx={{color: 'white'}}
//               />`
//   }

function App() {

  const [checked, setChecked ] = useState<boolean>(false)

  

  return (
    <div className="backdrop">
      {/* <Box sx={{ height: 180 }}>
        <Box sx={{ width: `calc(100px + 16px)` }}>
          
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Typography variant="h6" sx={{color: 'white'}}>Jioni yaja...</Typography>
          </Slide>
        </Box>
      </Box> */}
      <img className="logoImg" src={logo} alt='logo'/>

      <Stack direction='row' className='textField'>
        <Stack direction='column'className='outgoingTexts'> <Texts/></Stack>
      </Stack>
      <SwipeableEdgeDrawer/>
      
    </div>
  );
}

export default App;
