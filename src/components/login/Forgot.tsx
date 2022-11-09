import React, { useState } from 'react'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import AnotherBasicModal from './AnotherBasicModal'

import './css/forgot.css'
import logo from'../../assets/logo.png'

const Forgot = () => {

    const [forgottenEmail, setForgottenEmail ] = useState<string>('')
    const [openItTwo, setOpenItTwo ] = useState<boolean>(false)

    const submitHandler = async(e: { preventDefault: () => void })=>{
        e.preventDefault();
        
        try{
            
            let requestData = JSON.stringify({
                email: forgottenEmail
            })
            await fetch(`${process.env.REACT_APP_BYJ_API_URL}/forgot`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
                body: requestData
                })
                .then((data)=>{
                    if(data.status === 201){
                        setOpenItTwo(true)
                    }
                }) 
                console.log('done')
        }catch(error){
            console.log(error)
        }
    }


  return (
    <Stack className='mainBody'>
        <Stack sx={{width:'350px', mt:4}}>
            <div className='byjLogo'>
                <img className='logoItselfThree' src={logo} alt='Bei Ya Jioni logo'/>
            </div>
            <Stack className='focusHere'>
                <p className="fpHeading">Forgot Password?</p>
                <p className="fpHeadingTwo">No problem!</p>
                <Typography>
                    Enter the E Mail address you used to register in the field below and we'll send you a password reset link:
                </Typography>
                <Grid className='email' 
                    sx={{
                        mt:3,
                        width: '320px'                
                    }}>
                    <TextField
                        name="email"
                        required
                        fullWidth
                        id="outlined"
                        label="Enter your E-Mail here..."
                        autoFocus
                        sx={{ backgroundColor: 'white'}}
                        onChange={(e) => setForgottenEmail(e.target.value)} value={forgottenEmail}
                        />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: 'rgb(9,29,150)', width:'320px', mt: 3, mb: 2 }}
                    onClick = {submitHandler}
                    >
                    Send me the link!
                </Button>
            </Stack>
        </Stack>
        <AnotherBasicModal openItTwo={openItTwo} setOpenItTwo={setOpenItTwo}/>
    </Stack>
  )
}

export default Forgot