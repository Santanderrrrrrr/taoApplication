import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton, Stack, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import ProdModal from "../../foundItems/users/prodLayout/prodModal/ProdModal"
import { useAppContext } from '../../../context/appContext'
import * as typing from "../../../types/appTypes"
import "./prodCard.css"


const ProdCard: React.FC<typing.prodInterface> = ({prod}) => {
    const navigate = useNavigate()
    const { toggleLike, token, openModal, currentUser, getTheView } = useAppContext()



    //function to like item
    const handleLike = (prodId: string): void=>{
        toggleLike(prodId, token, "exploreProducts")
    }

    const handleOpen = (displayProd: typing.prodInterface['prod']) => openModal('prodModal', displayProd);    

    const handleViewUser = async(userId: string)=>{
        const canNavigate = await getTheView(userId, token, "users")
        if(typeof canNavigate === "boolean" && canNavigate){
            navigate(`/u/${userId}`)
        }
    }


  return (
    <Stack className="prodCard" sx={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(247,247,247)",
            m:1,
            boxSizing:"border-box",
            borderRadius: "10px",
            border: "1px solid rgb(247,247,247)"
        }}
    >   
        <Stack
            onClick={()=>handleViewUser(prod?.sellerId?._id)}
            sx={{
                width: "100%",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems:"center",
                backgroundColor: "#FFF",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px"
            }}
        >
            <div className={"exploreUserAvatar"}>
                <img className={"exploreUserAvatarPic"} src={prod?.sellerId?.picture!} alt={prod?.sellerId?.username} />
            </div>
            <Typography 
                sx={{ml: 1, color: "#048"}} 
                className="exploreUserAvatarUsername" 
                variant="caption"
                
            >
                {prod?.sellerId?.username!}
            </Typography>

        </Stack>
        <Carousel
            className="exploreCarousel"
            fullHeightHover={true}
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
            sx={{width: '100%', height: '200px'}}
            NextIcon={<ArrowForwardIos/>}
            PrevIcon={<ArrowBackIos/>}
            >
                {prod?.images?.map((img, index)=>{
                    return (
                        <React.Fragment key={index}>
                            <Stack className="exploreCarouselDiv"  
                                sx={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    display: 'flex', 
                                    direction:'row', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}
                            >
                                <img
                                    className="exploreCarouselImg"
                                    style={{ maxHeight: "200px"}}
                                    src={img}
                                    alt={prod.name}
                                    onClick={()=> handleOpen(prod)}
                                />
                            </Stack>
                        </React.Fragment>
                        
                    )
                })}
        </Carousel>
        <Stack
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px"
            }}
        >
            <Stack className="exploreProdDesc" sx={{ml: 1, mt: 1}}>
                <Typography variant={"subtitle2"} sx={{m: 0, p: 0, color: "#048"}}>{prod?.categoryId?.name.substring(0, 10)}{prod?.categoryId.name.length> 10? "..." : ""}</Typography>
                <Typography variant={"caption"} sx={{m: 0, p: 0, color: "#048"}}>{prod?.brand ? prod.brand : "tbd"}</Typography>
                <Typography variant={"caption"} sx={{m: 0, p: 0, color: "#048"}}>{prod?.sizeId?.name}</Typography>
            </Stack>
            <Stack className="explorePriceAndLikes"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    mr: 1, mt:1
                }}
            >
                <Typography variant="subtitle2" 
                    sx={{
                        color: "#048",
                        fontSize: 14
                    }}
                >
                    kes{prod?.price}
                </Typography>
                <IconButton 
                    disableRipple={true} 
                    onClick={()=>handleLike(prod?._id!)}
                    sx={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent:'flex-start',
                        
                    }}>
                    {prod?.likes?.includes(currentUser?._id)? <Favorite color='error' /> : prod!?.likes!?.length > 0 ? <FavoriteBorder color='error' /> : <FavoriteBorder/>}
                    <Typography 
                        variant="caption"
                        sx={{
                            fontSize: 12,
                            ml: 0.5
                        }}>
                            {`${prod?.likes?.length}`}
                    </Typography>
                </IconButton>
            </Stack>
        </Stack>
        <ProdModal />
    </Stack>
  )
}

export default ProdCard