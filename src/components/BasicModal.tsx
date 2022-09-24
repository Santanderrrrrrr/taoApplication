import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import './componentCss/BasicModal.css'
import MessageIcon from '../assets/pngkey.com-messages-png-3728292.png'


interface modalProperties{
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
  openIt: boolean
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:700, sm:400, xs: '100%'},
  bgcolor: 'background.paper',
  border: '1px solid #333',
  borderRadius:'5px',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<modalProperties> = ({openIt, setOpenIt}) => {
  const handleClose = () => {
    // console.log(openIt)
    setOpenIt(false);
  }
  

  return (
    <Modal
      open={openIt}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Stack className='backDrop' sx={{ backgroundColor:'#222', width:'350px', height: `290px`, ml: 'auto', mr:'auto', mt:'15%' }}>
          <Stack sx={{ 
            backgroundColor:'rgb(233,233,233)',
            display:'flex', 
            flexDirection:'row', 
            alignItems:'baseline',
            height:'22%',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',

            }}>
              <div className='message-icon'></div>
              <Typography variant="body1" className='writing' sx={{ml:1.5}}>MESSAGES</Typography>
              <Typography variant="body2" className='writing' sx={{ml:21.5}}>now</Typography>
          </Stack>
          <Stack className='textBody' sx={{
            display: 'flex',
            flexDirection:'column',

            height:'82%',
            backgroundColor:'rgb(214, 214, 214)',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}          
          >
            <Typography variant='h6' sx={{ml:1.5, mt: 2, mb:-0.25, mr:1.5}}>Thanks for registering!</Typography>
            <Typography sx={{ml:1.5, mt: 0.25, mr:1.5}}>In a few, there will be a confirmation link in the email you provided. Click it and you're set! When we're up, you'll be among the very first to know!</Typography>
            <Typography sx={{ml:1.5, mt: 0.25, mr:1.5}}></Typography>
            <Typography sx={{ml:1.5, mt: 0.25, mr:1.5}}>Finally, if you know someone who needs to buy or sell something, <Typography variant="button">tell them about us!</Typography></Typography>

          </Stack>
        </Stack>
         
        
      </div> 
    </Modal>
  );
}

export default BasicModal