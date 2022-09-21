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

const drawerBleeding = 56;



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

export default function SwipeableEdgeDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example

  return (
    <>
   
      {/* <CssBaseline /> */}
       {/* <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              width: '390px',
              ml: '50%',
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
          },
        }}
        />  */}
      
        
      
      <Button sx={{mt:40, ml: 40}} onClick={toggleDrawer(true)}>Register</Button>
      <Stack sx={{backgroundColor: 'green', display: 'flex', justifyItems: 'center'}}>
        <SwipeableDrawer
          anchor="bottom"
          disableBackdropTransition={true}
          disableDiscovery={true}
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
            onClick={toggleDrawer(true)}
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              width: '390px',
              right: 0,
              left: 0,
            }}
          >                                                         {/**Skeleton background */}
            <Puller />
            <Stack direction="row" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Typography sx={{ p: 2, color: 'text.secondary' }}>{open===false? "Swipe up here to register!":"Fill the form below:"}</Typography>
            </Stack>
          </StyledBox>
          <StyledBox
            sx={{
              // px: 2,
              pb: 2,
              height: '100%',
              width:'100%',
              overflow: 'auto',

            }}
          >
            <Skeleton variant="rectangular" height="100%" />
          </StyledBox>
        </SwipeableDrawer>
      </Stack>
      </>
  );
}
