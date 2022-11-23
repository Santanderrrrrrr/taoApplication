import React, { useEffect } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from "react-router-dom";
import { MoreVert, FavoriteBorder, Favorite } from '@mui/icons-material'
import PositionedMenu from './positionedMenu/PositionedMenu'
import ProdModal from './prodModal/ProdModal'
import { useAppContext } from '../../../context/appContext'
import * as typing from '../../../types/appTypes'
import './prodlayout.css'



const ProdLayout: React.FC<typing.ForProdLayout> = () => {

    const navigate = useNavigate()

    const { 
        token, 
        currentUser, 
        products, 
        getMyProducts,
        openModal } = useAppContext()


    useEffect(()=>{
        //fetching the user products
        if(currentUser){
            getMyProducts( token, currentUser._id )
        }
        if(!products){
            navigate('/login')
        }
        
    },[])

    const handleOpen = (displayProd: typing.prodInterface['prod']) => openModal('prodModal', displayProd);    

    //state for positionedMenu item
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const ouvrir = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const mappedprods = (products as typing.prodInterface['prod'][])!.map((product, index)=>{
        const prodDate = new Date(product.createdAt).toString().substring(0, 15)
        return(
            <React.Fragment key={index}>
                {/* <h3 >{product.name}</h3> */}
                    <Box 
                        className={ index%2 === 0 && index == products.length-1?  "oddLastProdListItem" : "prodListItem"}
                        sx={{ 
                            borderRadius: '10px',
                            border: '1px solid rgb(247,247,247)',
                            backgroundColor: 'rgb(247,247,247)',
                            // m: 'auto',
                            mb: 1, 
                            zindex: 13,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
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
                                }
                            }} 
                            sx={{width: '175px', height: '150px'}}
                            NextIcon={<ArrowForwardIos/>}
                            PrevIcon={<ArrowBackIos/>}
                            >
                                {product.images.map((img, index)=>{
                                return (
                                <Stack className="carouselDiv" key={index} sx={{ width: '175px', height: '100%', display: 'flex', direction:'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        className="carouselImg"
                                        style={{ maxHeight: "150px"}}
                                        src={img}
                                        alt={product.name}
                                        onClick={()=> handleOpen(product)}
                                    />
                                </Stack>)
                                })}
                        </Carousel>
                        <Stack sx={{width: '177px', display: 'flex', justifyContent: 'flex-start', mt:1, mr: 'auto', ml: 1, mb: 1, color: '#048'}}>
                            <Typography variant='body2' sx={{ maxWidth: '170px'}}>{product.name}</Typography>
                            <Typography variant='caption' sx={{mb: 1, fontSize: 10}}>{prodDate}</Typography>    
                            <Typography variant='subtitle2' sx={{}}><b>kes</b> {product.price}</Typography>    
                            <Stack sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent:'space-between', 
                                alignItems: 'center', 
                                mt:2 , mb: 1
                            }}>
                                <IconButton disableRipple={true} sx={{
                                    width: '50%', 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    justifyContent:'flex-start',
                                    
                                }}>
                                    {/* {product?.likes?.includes(currentUser._id)? <Favorite color='error' /> : <FavoriteBorder color='error' />} */}
                                    <FavoriteBorder color='error' />
                                </IconButton>
                                <IconButton disableRipple={true}
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
                                </IconButton>
                                <PositionedMenu setAnchorEl={setAnchorEl} anchorEl={anchorEl} ouvrir={ouvrir}/>
                            </Stack>
                        </Stack>
                    </Box>
                    
            </React.Fragment>
        )
    })
    

  return (
    <>
        <Typography variant="subtitle2" sx={{color: '#048', m: 1}}>Products</Typography>
        <div className="prodContainer">
            {mappedprods}
            <ProdModal/>
        </div>
    </>
  )
}

export default ProdLayout