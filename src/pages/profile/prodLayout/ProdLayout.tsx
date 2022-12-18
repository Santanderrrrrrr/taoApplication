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
import './CSS/prodlayout.css'



const ProdLayout: React.FC<typing.ForProdLayout> = () => {

    const navigate = useNavigate()

    const { 
        token, 
        currentUser, 
        products, 
        getMyProducts,
        openModal,
        toggleLike,
        logout 
    } = useAppContext()


    useEffect(()=>{
        const firstTake = async()=>{
        //fetching the user products
            if(currentUser){
                const willNavigate = await getMyProducts( token, currentUser._id )
                // console.log(willNavigate)
                if(typeof willNavigate === 'string' && willNavigate.includes("error")){ 
                    await logout()
                    navigate('/login')
                }
            }
        }
        firstTake()
    },[])

    const handleOpen = (displayProd: typing.prodInterface['prod']) => openModal('prodModal', displayProd);    

    //state for positionedMenu item
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [productId, setProductId] = React.useState<string>('');
    const ouvrir = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, productId: string) => {
        setProductId(productId)
        setAnchorEl(event.currentTarget);
    };

    //function to like item
    const handleLike = (prodId: string): void=>{
        toggleLike(prodId, token)
    }


    const mappedprods = Array.isArray(products)? (products! as typing.prodInterface['prod'][])?.map((product, index)=>{
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
                            <Stack sx={{padding: 0.5, borderRadius: '5px', backgroundColor: "#fff"}}>
                                <Typography variant='subtitle2' sx={{}}><b>kes</b> {product.price}</Typography>    
                            </Stack>
                            <Stack 
                            sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent:'space-between', 
                                alignItems: 'center', 
                                mt:2 , mb: 1
                            }}>
                                <IconButton 
                                    disableRipple={true} 
                                    onClick={()=>handleLike(product._id)}
                                    sx={{
                                        width: '50%', 
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent:'flex-start',
                                        
                                    }}>
                                    {product?.likes?.includes(currentUser._id)? <Favorite color='error' /> : product!?.likes!?.length > 0 ? <FavoriteBorder color='error' /> : <FavoriteBorder/>}
                                    <Typography 
                                        variant="caption"
                                        sx={{
                                            fontSize: 12,
                                            ml: 1
                                        }}>
                                            {`${product?.likes?.length} ${product?.likes?.length===1? "like": "likes"}`}
                                    </Typography>
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
                                        onClick={(e)=>handleClick(e, product._id)}
                                    >
                                    <MoreVert/>
                                </IconButton>
                                <PositionedMenu setAnchorEl={setAnchorEl} anchorEl={anchorEl} ouvrir={ouvrir} prodId={productId}/>
                            </Stack>
                        </Stack>
                    </Box>
                    
            </React.Fragment>
        )
    }) : ""
    

    if (products?.length <= 0) {
        return (
          <div className="nothingDiv">
            <h2>Add some products to get started!</h2>
          </div>
        );
      }

  return (
    <>
        {products.length > 0 && 
        <>
            <Typography variant="subtitle2" sx={{color: '#048', m: 1}}>Products</Typography>
            <div className="prodContainer">
                {mappedprods}
                <ProdModal/>
            </div>
        </>}
    </>
  )
}

export default ProdLayout