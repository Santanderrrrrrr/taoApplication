import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useAppContext } from '../../context/appContext'
import * as typing from "../../types/appTypes"
import logo from '../../assets/logo.png'
import './feed.css'
import ProdCard from './prodCards/ProdCard'


const Feed = () => {

    const navigate = useNavigate()
    
    const {getFeed, token, feedProducts, pageNumber, logout } = useAppContext()
    
    
    const loadFeed = async()=>{
        if(feedProducts.length === 0 ){
            const willNavigate = await getFeed(token, "products", pageNumber)

            if(typeof willNavigate === 'string' && willNavigate.includes("error")){ 
                await logout()
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        loadFeed()
    }, [])

    const mappedProds = feedProducts.map((prod: typing.prodInterface["prod"], index: number)=>{
        return (
            <React.Fragment key={index}>
                <ProdCard prod={prod}/>
    
            </React.Fragment>)
    })

    
  return (
    <div className="feedScaffolding">
      <Stack 
        sx={{
          width:'390px',
          height: '100vh'
        }}
      >
        <Stack
          sx={{
            maxWidth: '100%',
            display: 'flex',
            flexDirection:"column", 
            alignItems: 'flex-start',
            boxSizing: "border-box"
          }}
        >
          <Stack className="feedHeader">
            <div className='feedByjLogo'>
                <img className='logoItselfSix' src={logo} alt='Bei Ya Jioni logo'/>
            </div>
          </Stack>

          <Stack
              sx={{
                  mt: 2,
                  color: "#048"
              }}
          >
              <Typography variant="subtitle2">New from your stylers:</Typography>
          </Stack>

          {feedProducts &&<Stack className="prodCards">
              {mappedProds}
          </Stack>}

          {feedProducts?.length === 0 && <div className="feedNothingDiv">
              <h6>There's nothing here yet, but you could</h6>
              <h5>Follow some stylers to see what's in stock for you!</h5>
              <h6>(You can find some in the search section)</h6>
            </div>}
        </Stack>

      </Stack>
    </div>
  )
}

export default Feed