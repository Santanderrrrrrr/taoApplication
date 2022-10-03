import { useState } from 'react';
import logo from '../../assets/logo.png'
import './comingSoonCss/ComingSoon.css'
import { Stack } from '@mui/material'
import Texts from './Texts';
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import BasicModal from './BasicModal'

const ComingSoon = () => {
    const [openIt, setOpenIt] = useState<boolean>(false)

  return (
    <div className="backdrop">
          <Stack sx={{
            backgroundColor: '#f4f4f5',
            width:'390px',
            height:'131px',
            display: 'flex',
            flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',
            pr:'10px',
            pl:'10px',
            borderBottom:'1.5px solid #e4e4e7',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            mb:2
          }}>
            <ArrowBackIosNewOutlinedIcon color="primary" sx={{height:'24px', mt:3}} ></ArrowBackIosNewOutlinedIcon>
            <img className="logoImg" src={logo} alt='logo'/>
            <InfoOutlinedIcon color='primary' sx={{height:'24px', mt:3}}/>
          </Stack>

          <Stack direction='row' className='textField'>
            <Stack direction='column'className='outgoingTexts'> <Texts/></Stack>
          </Stack>
          
          <Stack sx={{display:'flex', direction:'column', alignItems:'center', justifyContent: 'center'}}>
            <SwipeableEdgeDrawer setOpenIt={setOpenIt}/>
          </Stack>
          <BasicModal openIt={openIt} setOpenIt={setOpenIt} />
          
        </div>
  )
}

export default ComingSoon