import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { useAppContext } from "../../context/appContext"
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Settings, Save, AddAPhoto, Search, Storefront } from '@mui/icons-material';
import './psd.css'


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    bottom: 16, 
    right:16,
  '&.MuiSpeedDial-directionLeft': {
    // bottom: theme.spacing(2),
    // right: theme.spacing(2),
  },  
}));

const links = [
  '/profile', '/new', '/search', '/profile'
]



export default function PlaygroundSpeedDial() {
    
    const { currentUser, openModal } = useAppContext()
    
    const actions = [
        { icon: <Settings sx={{color:'#048'}}/>, name: 'Settings' },
        { icon: <Link to={`${links[0]}`}>
            <div className="speedDialProfilePic">
                <img className="sdProfilePicImg" alt="current user" src={`${currentUser.picture}`}/>
            </div>
        </Link>, name: 'Profile' },
        { icon: <Link to={`${links[1]}`}><AddAPhoto sx={{color:'#048'}}/></Link>, name: 'New' },
        { icon: <Link to={`${links[2]}`}><Search sx={{color:'#048'}}/></Link>, name: 'Search' },
        { icon: <Storefront sx={{color:'#048'}}/>, name: 'Home' },
    ];
    
    const handleClick = ()=>{
      openModal('settings')
    }
    //Type 'string | ((e: MouseEvent<HTMLDivElement, MouseEvent>) => void)' is not assignable to type 'MouseEventHandler<HTMLDivElement> | undefined'.
    // Type 'string' is not assignable to type 'MouseEventHandler<HTMLDivElement>'.

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
        position: 'relative', 
        width: '390px',
        height: '0vh',
        // b: 12, 
        zIndex: 77 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={false}
          icon={<SpeedDialIcon />}
          direction={"left"}
        >
          {actions.map((action, index) => (
            
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.name === 'Settings'? () => handleClick(): undefined}
                />
            
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}