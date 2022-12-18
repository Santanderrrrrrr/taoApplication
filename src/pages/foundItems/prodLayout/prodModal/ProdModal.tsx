import * as React from 'react';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useAppContext } from '../../../../context/appContext'
import { 
    Box, 
    Chip, 
    createTheme, 
    IconButton, 
    Stack, 
    Typography, 
    ThemeProvider
} from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'
import * as typing from '../../../../types/appTypes'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    bgcolor: 'rgb(247, 247, 247)',
    borderRadius: '10px',
    filter: "drop-shadow(0 2px 1px rgba(54, 62, 69, 0.5))",

    p: 2
};

// const theme = createTheme({
//     components: {
//       // Name of the component
//       MuiModal: {
//         styleOverrides: {
//           // Name of the slot
//           backdrop: {
//             // Some CSS
//             // margin: '0px',
//           },
//         },
//       },
//     }})
  
export default function BasicModal() {

  const { prodModalOpen, closeModal, displayProd, currentUser, toggleLike, token } = useAppContext()
  const prodDate = new Date(displayProd.createdAt).toString().substring(0, 15)


  const handleClose = () => closeModal('prodModal');



  //function to like item
  const handleLike = (prodId: string): void=>{
    toggleLike(prodId, token)
  }

  return (
    <div>
      {displayProd && <Modal
        className="prodModalItself"
        open={prodModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{style: {backgroundColor: 'rgba(0,68,136,0.1)'}}}
      >
        <Box sx={style}>
            
            <Carousel
                className="carousel"
                next={ (next, active) => null }
                prev={ (prev, active) => null } 
                indicators={false}   
                autoPlay={false}      
                animation="fade"
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        borderRadius: 0
                        // display: 'none'
                    }
                }} 
                sx={{width: '100%', height: '240px'}}
                NextIcon={<ArrowForwardIos/>}
                PrevIcon={<ArrowBackIos/>}
                >
                    {(displayProd as typing.prodInterface['prod']).images?.map((img, index)=>{
                    return (
                    <Stack className="carouselDiv" key={index} sx={{ width: '100%', height: '100%', display: 'flex', direction:'row', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            className="carouselImg"
                            style={{ maxHeight: "240px"}}
                            src={img}
                            alt={displayProd.name}
                        />
                    </Stack>)
                    })}
            </Carousel>
          <Stack id="prodModal-description" sx={{ mt: 2, ml: 1, maxWidth: '390px' }}>
            {displayProd.name}
            <Typography variant='caption' sx={{ fontSize: 10 }}>
                {prodDate}
            </Typography>
            <Typography variant='caption' sx={{ mt: 1, fontSize: 14 }}>
                {displayProd.description}
            </Typography>
            <Stack sx={{ 
                m: 1, 
                maxWidth: '390px', 
                display: 'flex', 
                flexDirection: "row", 
                justifyContent: 'space-between'
            }}>
                <Typography variant='subtitle2' sx={{ mt: 1, fontSize: 16, color:'#048' }}>
                    <b>kes</b> {displayProd.price}
                </Typography>
                <Chip 
                    sx={{color:'#048'}} 
                    variant={"outlined"}
                    label={`Brand: ${displayProd.brand? displayProd.brand : "tbd"}`} 
                />

            </Stack>
          </Stack>
          <Stack sx={{ 
            mt: 1, 
            maxWidth: '390px', 
            display: 'flex', 
            flexDirection: "row", 
            justifyContent: 'space-evenly'
            }}>
                <Chip sx={{color:'#048'}} label={`for: ${displayProd.genderId?.name}`} />
                <Chip sx={{color:'#048'}} label={`size: ${displayProd.sizeId?.name}`} />
                <Chip sx={{color:'#048'}} label={`category: ${displayProd.categoryId?.name}`} />
          </Stack>
          <Stack sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent:'space-between', 
              alignItems: 'center', 
              mt:2 , mb: 1
          }}>
              <IconButton 
                  disableRipple={true} 
                  onClick={()=>handleLike(displayProd._id)}
                  sx={{
                      width: '50%', 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent:'flex-start',
                      
                  }}>
                    {displayProd?.likes?.includes(currentUser?._id)? <Favorite color='error' /> : displayProd!?.likes!?.length > 0 ? <FavoriteBorder color='error' /> : <FavoriteBorder/>}
                  <Typography 
                      variant="caption"
                      sx={{
                          fontSize: 12,
                          ml: 1
                      }}>
                          {`${displayProd?.likes?.length} ${displayProd?.likes?.length===1? "like": "likes"}`}
                  </Typography>
              </IconButton>
              {/* <IconButton disableRipple={true}
                      sx={{
                          width: '50%', 
                          display: 'flex', 
                          flexDirection: 'row', 
                          justifyContent:'flex-end',
                          
                          pr: 2
                      }}
                      id="demo-positioned-button"
                      aria-controls={ouvrir ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={ouvrir ? 'true' : undefined}
                      onClick={handleClick}
                  >
                  <MoreVert/>
              </IconButton> */}
              {/* <PositionedMenu setAnchorEl={setAnchorEl} anchorEl={anchorEl} ouvrir={ouvrir} prodId={displayProd._id}/> */}
          </Stack>
        </Box>
      </Modal>}
    </div>
  );
}