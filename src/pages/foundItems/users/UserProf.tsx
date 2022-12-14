import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useAppContext } from '../../../context/appContext'
import ProdLayout from '../prodLayout/ProdLayout'
import AboutAccordion from './accordion/AboutAccordion'
import { Stack, Typography, Divider, Box } from '@mui/material';
import '../../profile/css/profile.css'
import logo from '../../../assets/logo.png'
import * as typing from '../../../types/appTypes'



const UserProf: React.FC = () => {
    const { userId} = useParams()

    const { userToView, getTheView, token } = useAppContext()
    

    const [ theUser, setTheUser ] = useState <typing.theUser["user"]>(userToView)

    useEffect(()=>{
        // console.log("useEffect hit")
        const canRefresh = getTheView(userId, token, "users")
        if(typeof canRefresh === "boolean" && canRefresh){
            setTheUser(userToView)
        }
    }, [])

    
  return (
    <>
        {theUser && <div className="backdrop">
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
                        <img src={theUser!.picture} alt="avatar placeholder" className="profilePicture" /> 
                    </Stack>
                    <Stack className="userDeets" sx={{display: "flex", flexDirection: "column", alignItems: 'center', width:'70%', ml: 2}}>
                        <Stack className="nameNFolls" sx={{display: "flex", flexDirection: "row", justifyContent: 'space-evenly'}}>
                            <Stack className="names" >
                                <Typography 
                                    variant="subtitle2"
                                    sx={{mt:1, color: 'rgba(26,117,255,1)'}}
                                    >{ theUser!.username?.substring(0, 12)}
                                </Typography>
                                <Typography 
                                    variant="caption"
                                    // sx={{mt:1}}
                                    >{ theUser!?.firstname } { theUser!?.lastname}
                                </Typography>
                            </Stack>
                            <Stack className="followers" sx={{ml: 2}}>
                                <Typography 
                                    variant="subtitle2"
                                    sx={{mt:1}}
                                    >{ "Followers"}
                                </Typography>
                                <Typography 
                                    variant="caption"
                                    // sx={{mt:1}}
                                    >{ theUser!.followers?.length}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack className="bio" sx={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                            <AboutAccordion user={theUser}/>
                        </Stack>
                        <Stack className="contacts">

                        </Stack>
                    </Stack>
                </Box>
                <Divider variant="middle" sx={{mt: 2, mb:1}} />
                {theUser && <ProdLayout/>}
            </div>
        </div>}
    </>
  )
}

export default UserProf