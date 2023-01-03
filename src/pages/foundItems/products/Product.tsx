import React, { useEffect } from 'react'
import { Button, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"
import Carousel from 'react-material-ui-carousel'
import { useParams } from "react-router-dom"
import { useAppContext } from "../../../context/appContext"
import * as typing from "../../../types/appTypes"
import logo from '../../../assets/logo.png'
import "./product.css"

const Product = () => {

  const navigate = useNavigate()

  const { productId } = useParams()

  const { productToView, token, currentUser, doFollow, toggleLike, getTheView } = useAppContext()


  
  const handleFollow = (userId: string )=>{
    doFollow(userId, token, "users")
  }

  const handleLike = (prodId: string): void=>{
    toggleLike(prodId, token, "productToView")
  }

  const handleViewUser = async(userId: string)=>{
    const canNavigate = await getTheView(userId, token, "users")
    if(typeof canNavigate === "boolean" && canNavigate){
        navigate(`/u/${userId}`)
    }
}
  
  useEffect(()=>{
    if(Object.keys(productToView)?.length === 0){
      getTheView(productId, token, "products" )
    }
  }, [])

  return (
    <Stack 
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      <Stack
        sx={{
          width: "390px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack className="productHeader">
          <div className='prodByjLogo'>
              <img className='logoItselfFive' src={logo} alt='Bei Ya Jioni logo'/>
          </div>
        </Stack>
        <div className="prodSellerDiv">
            <img className= "sellerImage" src={productToView?.sellerId?.picture} alt={`${productToView?.sellerId?.username} display`} />
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{
                ml: 1
              }}
            ></Divider>
            <Stack
              className="prodSellerDivWriting"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", 
                ml: 1
              }}
            >
              <Typography 
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: 10
                }}
              >
                {`this product was added by`}
              </Typography>
              <Typography 
                variant="subtitle2"
                onClick={()=>handleViewUser(productToView?.sellerId?._id)}
                sx={{
                  color: "#048",
                }}
              >
                {productToView?.sellerId?.username?.substring(0, 12)}
              </Typography>
              {currentUser?._id !== productToView?.sellerId?._id && <Typography 
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: 10
                }}
              >
                <Button
                  onClick={()=>handleFollow(productToView?.sellerId?._id)}
                  size="small"
                  sx={{p:0, color: "#023020", minWidth: 0, maxWidth: "50px", fontSize: 10, mr: 0.5}}
                >
                  Follow
                </Button>
                {`to see more`}
              </Typography>}
            </Stack>
        </div>
        <Stack
          className="activeAreaProd"
          sx={{
            mt: 2,
            mb: 1,
            borderRadius: "10px",
            width: "360px",
            maxWidth: "90%",
            ml: "auto",
            mr: "auto",
            height: "250px",
          }}
        >
          <Stack 
            className='carouselStack'
            sx={{
              mb: 2
            }}
          >
            <Carousel
              next={ (next, active) => null }
              prev={ (prev, active) => null } 
              indicators={false}   
              autoPlay={false}      
              animation="fade"
              navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderRadius: "50%"
                }
              }} 
              sx={{ 
                width: "350px",
                height: '240px',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              NextIcon={<ArrowForwardIos color="primary"/>}
              PrevIcon={<ArrowBackIos color="primary"/>}
            >
              {(productToView as typing.prodInterface['prod']).images?.map((img, index)=>{
              return (
                <Stack 
                  key={index} 
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    direction:'row', 
                    alignItems: 'center', 
                    justifyContent: 'center',  
                  }}>
                  <img
                    className="prodViewCarouselImg"
                    style={{ maxHeight: "240px" }}
                    src={img}
                    alt={productToView.name}
                  />
                </Stack>)
              })
              }
            </Carousel>
          </Stack>
          
          <Divider
            orientation="horizontal"
            flexItem
            variant="middle"
            sx={{ mb: 1}}
          ></Divider>

          <Stack
            className="descriptionStack"
          >
            <Stack 
            className="genderSizeCategory"
            sx={{ 
              mt: 1, 
              maxWidth: '390px', 
              display: 'flex', 
              flexDirection: "row", 
              justifyContent: 'flex-start'
            }}>
              <Chip sx={{color:'#048'}} label={`for: ${productToView?.genderId?.name}`} />
              <Chip sx={{color:'#048', ml: 1}} label={`size: ${productToView?.sizeId?.name}`} />
              <Chip sx={{color:'#048', ml: 1}} label={`category: ${productToView?.categoryId?.name}`} />
            </Stack>
            <Stack
              className="brandAndCondition"
              sx={{
                mt: 1, 
                maxWidth: '390px', 
                display: 'flex', 
                flexDirection: "row", 
                justifyContent: 'flex-start'
              }}
            >
              <Chip 
                    sx={{color:'#048', mr:1}} 
                    variant={"outlined"}
                    label={`Brand: ${productToView?.brand? productToView?.brand : "tbd"}`} 
                />
              <Chip 
                    sx={{color:'#048', mr: "auto"}} 
                    variant={"outlined"}
                    label={`Condition: ${productToView?.condition? productToView?.condition : "tbd"}`} 
                />
            </Stack>
            <Stack 
              className="titleAndLikes"
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
                alignItems: "flex-end"
              }}
            >
              <Typography 
                  variant="h6"
                  sx={{
                    fontSize: 20,
                    color: "#000",
                    maxWidth: "70%",
                    fontWeight: "bold"
                  }}
                >
                {productToView?.name}
              </Typography>
              <IconButton 
                  disableRipple={true} 
                  onClick={()=>handleLike(productToView._id)}
                  sx={{
                      width: '50%', 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent:'flex-start',
                      maxWidth: "30%"
                  }}>
                    {productToView?.likes?.includes(currentUser?._id)? <Favorite color='error' /> : productToView!?.likes!?.length > 0 ? <FavoriteBorder color='error' /> : <FavoriteBorder/>}
                  <Typography 
                      variant="caption"
                      sx={{
                          fontSize: 12,
                          ml: 1
                      }}>
                          {`${productToView?.likes?.length} ${productToView?.likes?.length===1? "like": "likes"}`}
                  </Typography>
              </IconButton>
            </Stack>
            <Stack 
              className="descriptionAndPrice"
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
                alignItems: "flex-end"
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  maxWidth: "70%",
                  backgroundColor: "#f7f7f7",
                  p:1,
                  borderRadius: "10px"
                }}
              >
                {productToView?.description}
              </Typography>
              <Typography variant='subtitle2' sx={{ maxWidth: "30%", mt: 1, fontSize: 16, color:'#048' }}>
                <b>kes</b> {productToView?.price}
              </Typography>
            </Stack>
            

          </Stack>

          <Divider
            orientation="horizontal"
            flexItem
            variant="middle"
            sx={{ mt: 4}}
          ></Divider>
        </Stack>

      </Stack>

    </Stack>
  )
}

export default Product