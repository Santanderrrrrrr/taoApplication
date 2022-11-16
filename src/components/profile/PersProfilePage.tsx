import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ProdLayout from './prodLayout/ProdLayout'
import './css/profile.css'
import { Stack, Typography, Divider, Box } from '@mui/material';
import logo from '../../assets/logo.png'




type theUser = {
    user:{
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        telephone: string;
        followers: {
            type?: string | undefined;
        }[];
        following: {
            type?: string | undefined;
        }[];
        location?: string
        picture: string
        verified: boolean
        bio: string
    } | null
    
} 





const PersProfilePage: React.FC = () => {
    

    const [accessToken, setAccessToken] = useState<string>((JSON.parse(localStorage.getItem('accessToken') as string)))
    const [persId, setPersId] = useState<string | undefined>('')
    const [ theUser, setTheUser ] = useState <theUser["user"]>()
    
    
    

    
    
    
    useEffect(()=>{
        //fetching this user
        if(accessToken){
            (async()=>{
                await fetch(`${process.env.REACT_APP_BYJ_API_URL}/users/me`,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + `${accessToken}`
                        },
                    credentials: 'include',
                    })
                .then((data) => data.json())
                .then(deets => {
                    setPersId(()=> deets._id)
                    setTheUser(()=> deets)
                })
            })()
        }else{
            console.log('No access token or personal id registered')
        }
        
        
    }, [accessToken, persId])




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
                                    >{ theUser!.username.substring(0, 12)}
                                </Typography>
                                <Typography 
                                    variant="caption"
                                    // sx={{mt:1}}
                                    >{ theUser!.firstname } { theUser!.lastname}
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
                                    >{ theUser!.followers.length}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack className="bio" sx={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                            <Typography 
                                variant="subtitle2"
                                sx={{mt:1}}
                                >{ "About" }
                            </Typography>
                            <Typography 
                                variant="caption"
                                // sx={{mt:1}}
                                >{ theUser!.bio }
                            </Typography>
                        </Stack>
                        <Stack className="contacts">

                        </Stack>
                    </Stack>
                </Box>
                <Divider variant="middle" sx={{mt: 2, mb:1}} />
                {persId && <ProdLayout persId={persId}/>}

            </div>
        </div>}
    </>
  )
}

export default PersProfilePage