import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Stack } from '@mui/material';

import SignUp from './SignUp'

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>

}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window, setOpenIt } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Box sx={{   
        width:'90px', 
        display:'flex', 
        direction:'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:'#fff',
        border:'solid 1px #1a75ff',
        borderRadius:'15px',
        mr:35,
        mt:7
        }}>
        <Button sx={{
            color: '#1a75ff',
            border:'#1a75ff',
            borderRadius: '15px'}} 
            onClick={toggleDrawer(true)}>Register</Button>
    </Box>
    <Root>
      
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      
      <SwipeableDrawer
        PaperProps={{
            sx:{
                display:'block',
                width:'390px',
                position:'absolute',
                ml: 'auto',
                mr:'auto'
                
            }
        }}
        
        // variant="persistent"
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        <Stack sx={{width: '100%', display:'flex', direction: 'row', alignItems: 'center'}}>
            <Typography sx={{ p: 2, color: 'text.secondary' }}>{open? 'Fill the form below:':'Swipe up to register'}</Typography>
        </Stack>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <SignUp setOpenIt={setOpenIt}/>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
    </>
  );
}
