import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../context/appContext'
import './comingSoonCss/BasicModal.css'



const BasicModal: React.FC = () => {

  const { isOpenModal, closeModal } = useAppContext()

  const handleClose = () => {
    closeModal();
  }
  

  return (
    <Modal
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Stack className='backDrop' sx={{ backgroundColor:'#222', width:'350px', height: `290px`, ml: 'auto', mr:'auto', mt:'15%' }}>
          <Stack sx={{ 
            backgroundColor:'rgb(233,233,233)',
            width: '100%',
            display:'flex', 
            flexDirection:'row', 
            alignItems:'baseline',
            height:'22%',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',

            }}>
              <div className='message-icon'></div>
              <Typography variant="body1" className='writing' sx={{ml:1.5, mt:'auto', mb:'auto', color:'rgb(112, 111, 111)'}}>MESSAGES</Typography>
              <Typography variant="body2" className='writing' sx={{ml:21.5, mt:'auto', mb:'auto', color:'rgb(112, 111, 111)'}}>now</Typography>
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