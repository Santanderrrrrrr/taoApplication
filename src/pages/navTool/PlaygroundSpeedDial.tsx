import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom"
import { useAppContext } from "../../context/appContext"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Settings, AddAPhoto, Search, Storefront } from '@mui/icons-material';
import './psd.css'


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'fixed',
    bottom: 16, 
    right:16,
  '&.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },  
}));

const links = [
  '/profile', '/new', '/search', '/feed' 
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
        { icon: <Link to={`${links[3]}`}><Storefront sx={{color:'#048'}}/></Link>, name: 'Home' },
    ];
    
    const handleClick = ()=>{
      openModal('settings')
    }


  return (
    <>
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
    </>     
  );
}