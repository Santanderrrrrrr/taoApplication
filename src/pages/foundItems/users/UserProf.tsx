import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useAppContext } from '../../../context/appContext'
import ProdLayout from './prodLayout/ProdLayout'
import AboutAccordion from './accordion/AboutAccordion'
import { Stack, Typography, Divider, Box, Button } from '@mui/material';
import '../../profile/css/profile.css'
import logo from '../../../assets/logo.png'



const UserProf: React.FC = () => {
    const { userId} = useParams()

    const { userToView, token, currentUser, doFollow } = useAppContext()
    


    useEffect(()=>{
        
        
    }, [currentUser])

    const  handleFollow = async(userId: string)=>{
        console.log(userId, currentUser._id, userToView.followers)
        await doFollow(userId, token, "users")
    }

    const dontLetMeFollowMe = userId !== currentUser._id
    
  return (
    <>
        {userToView && <div className="backdrop">
            <div className='content'>
                <div className='profileHeading'>
                    <div className='profByjLogo'>
                        <img className='logoItselfFour' src={logo} alt='Bei Ya Jioni logo'/>
                    </div>
                </div>
                <Box className="userDetails"
                    sx={{ position: 'sticky', top: 65, display: 'flex', flexDirection: 'row', p:2, boxSizing: 'border-box', borderRadius:'10px'}}
                    >
                    <Stack className="profilePicture__container">
                        <img src={userToView!.picture} alt="avatar placeholder" className="profilePicture" /> 
                        {dontLetMeFollowMe && <Stack 
                            sx={{
                                // mt: 1
                            }}
                        >
                            <Button
                                onClick={()=>handleFollow(userId as string)}
                            >
                                {currentUser?.following?.indexOf(userId) === -1? "Follow" : "UNFOLLOW"}
                            </Button>
                        </Stack>}

                    </Stack>
                    <Stack className="userDeets" sx={{display: "flex", flexDirection: "column", alignItems: 'center', width:'70%', ml: 2}}>
                        <Stack className="nameNFolls" sx={{display: "flex", flexDirection: "row", justifyContent: 'space-evenly'}}>
                            <Stack className="names" >
                                <Typography 
                                    variant="subtitle2"
                                    sx={{mt:1, color: 'rgba(26,117,255,1)'}}
                                    >{ userToView!.username?.substring(0, 12)}
                                </Typography>
                                <Typography 
                                    variant="caption"
                                    // sx={{mt:1}}
                                    >{ userToView!?.firstname } { userToView!?.lastname}
                                </Typography>
                            </Stack>
                            <Stack className="followers" sx={{ml: 2}}>
                                <Typography 
                                    variant="subtitle2"
                                    sx={{mt:1}}
                                    >{ "Followers"}
                                </Typography>
                                <Typography 
                                    variant="subtitle2"
                                    sx={{ color: "rgba(26,117,255,1)"}}
                                    >{ userToView!.followers?.length}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack className="bio" sx={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                            <AboutAccordion user={userToView}/>
                        </Stack>
                        <Stack className="contacts">

                        </Stack>
                    </Stack>
                </Box>
                <Divider variant="middle" sx={{mt: 2, mb:1}} />
                {userToView && <ProdLayout/>}
            </div>
        </div>}
    </>
  )
}

export default UserProf