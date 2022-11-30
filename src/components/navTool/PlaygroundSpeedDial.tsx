import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Settings, Save, AddAPhoto, Search, Storefront } from '@mui/icons-material';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    // components: {
    //     // Name of the component
    //     MuiSpeedDial: {
    //         styleOverrides: {
    //             // Name of the slot
    //             fab: {
    //               // Some CSS
    //               backgroundColor: 'gold', 
    //               color: 'blue'
    //             },
    //           },
    //     },
    // },
  
  position: 'absolute',
  bottom: 16, 
  right:16,
  '&.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },  
  '&.MuiSpeedDial-fab':{
    backgroundColor: "#048",
  }
}));

const actions = [
  { icon: <Settings sx={{color:'#048'}}/>, name: 'Settings' },
  { icon: 'me', name: 'Profile' },
  { icon: <AddAPhoto sx={{color:'#048'}}/>, name: 'New' },
  { icon: <Search sx={{color:'#048'}}/>, name: 'Search' },
  { icon: <Storefront sx={{color:'#048'}}/>, name: 'Home' },
];

export default function PlaygroundSpeedDial() {

  return (
    <Box sx={{ 
        transform: 'translateZ(0px)', 
        flexGrow: 1, 
        width: '100vw',
        height: '100vh',
        display: 'flex', 
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 77 }}	>
      
      <Box sx={{ 
        position: 'fixed', 
        width: '390px',
        b: 3, 
        zIndex: 77 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={false}
          icon={<SpeedDialIcon />}
          direction={"left"}
          FabProps={{
            sx:{
                backgroundColor: "#048"
            }
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}