import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";




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

type prodInterface = {
    prod: {
        
    } | null
}

interface ForPPP{
    accessToken: string
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    persId: string
    setPersId: React.Dispatch<React.SetStateAction<string>>

}

const PersProfilePage: React.FC<ForPPP> = ({accessToken, setAccessToken, persId, setPersId }) => {
    
    const [ products, setProducts ] = useState<prodInterface['prod']>(null)
    
    
    

    
    
    
    useEffect(()=>{
        //fetching this user
        if(accessToken && persId){
            (async()=>{
                await fetch(`${process.env.REACT_APP_BYJ_API_URL}/users/${persId}`,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                        },
                    credentials: 'include',
                    })
                .then((data) => console.log(data))
            })()
        }else{
            console.log('No access token or personal id registered')
        }
        
        //fetching the user products
        
            
        if(accessToken&& persId)(async()=>{
            await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products/${persId}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                credentials: 'include',
                })
            .then((data)=>setProducts(data))
        })()
    }, [accessToken, persId])




  return (
    <div>PersProfilePage</div>
  )
}

export default PersProfilePage