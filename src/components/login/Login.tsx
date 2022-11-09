import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography, SwipeableDrawer, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import './css/login.css'

import SignUp from '../comingSoon/SignUp'
import BasicModal from '../comingSoon/BasicModal'
import Forgot from './Forgot'
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Data extends Response{
    accessToken: string,
    id: string
}

interface ForLogin{
    setAccessToken: React.Dispatch<React.SetStateAction<string>>,
    accessToken: string,
    setPersId: React.Dispatch<React.SetStateAction<string>>
    
}

const Login: React.FC<ForLogin> = ({setAccessToken, setPersId, accessToken}) => {


    //state for the form submission
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();


    //state for the functioning of the drawers
   const [open, setOpen] = useState<boolean>(false)
   const [forgot, setForgot] = useState<boolean>(false)
   const [openIt, setOpenIt] = useState<boolean>(false)

   //state for password field
   const [showPassword, setShowPassword ] = useState<boolean>(false)

   //state for navigate condition
   const [ theStatus, setTheStatus] = useState<number | undefined>(undefined)

    //password show functions
   const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

//submit the login
   const handleSubmit = async(e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; })=>{
        e.preventDefault()

        if(!email || !password) return alert(`Please enter your email AND password`)

        try{
            
            let requestData = JSON.stringify({
                email: email,
                password: password,
            })
            await fetch(`${process.env.REACT_APP_BYJ_API_URL}/login`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
                body: requestData
                })
            .then((data: Response) =>{                    
                console.log('done')
                if(data.status === 200){
                    setAccessToken((data as Data).accessToken) 
                }
                
            })
            if(accessToken){
                console.log(accessToken)
                navigate('/profile')
        
            }   
        }catch(error){
            console.log(error)
        }
   }

  

  return (
    <>
        <Stack className='backDrop'>
            <Stack className='activeArea'>
                <Box className='gradient' sx={{mt:2}}>
                    <img className='logoItselfTwo' src={logo} alt={'Bei Ya Jioni logo'}/>
                    <Typography className='instruction'>Welcome! Let's get started...</Typography>
                    <Box className='theFormItself' component="form" noValidate onSubmit={handleSubmit} sx={{ mt:4 }}> 
                        <Stack sx={{
                            width: '350px', 
                            
                            borderRadius: '15px',
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start'}}>
                                <Typography variant='h6' className='loginInstruction' sx={{ ml:'auto', mr: 'auto', mt: 3}}>Login Account: </Typography>

                                <Grid className='email' sx={{
                                    mt:3,
                                    ml: 2,
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
                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                        />
                                </Grid>
                                <Grid className='Password' sx={{
                                    mt:3,
                                    ml: 2,
                                    mb: 2,
                                    width: '320px'                
                                }}>
                                    <FormControl sx={{  }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e)=> setPassword(e.target.value)}
                                            sx={{ backgroundColor: 'white', width: '320px'}}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        </FormControl>
                                        <Typography variant='subtitle2' className='loginInstruction' sx={{ ml:'auto', mr: 'auto', mt:1}}>
                                            <Button size='small' onClick={()=>{setForgot(true)}}>Forgot your password?</Button>
                                        </Typography>

                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: 'rgb(9,29,150)', width:'320px',  ml: 2, mt: 3, mb: 2 }}
                                    >
                                    Log Me In!
                                </Button>
                        </Stack>   
                    </Box>
                    <Box sx={{ width: '350px', height:'30px', borderRadius:'5px', mt: 3, backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Typography variant='subtitle2' sx={{ml: 2, mt: 0.5}}>Don't have an account? <Button sx={{m:0, p:0}} onClick={()=>setOpen(true)}>Register</Button>!</Typography>
                    </Box>
                </Box>
            </Stack>
            
        </Stack>
        <SwipeableDrawer anchor='bottom' onClose={()=> setOpen(false)} onOpen={()=> {}} open={open} 
            PaperProps={{
                sx:{
                    display:'block',
                    width:'390px',
                    position:'absolute',
                    ml: 'auto',
                    mr:'auto',
                    borderRadius: '15px',
                }
            }}>
            <SignUp setOpenIt={setOpenIt}/>
        </SwipeableDrawer>
        <SwipeableDrawer anchor='left' onClose={()=> setForgot(false)} onOpen={()=> {}} open={forgot} 
            PaperProps={{
                sx:{
                    display:'block',
                    width:'390px',
                    position:'absolute',
                    ml: 'auto',
                    mr:'auto',
                    borderRadius: '15px',
                }
            }}>
            <Forgot/>
        </SwipeableDrawer>
        <BasicModal openIt={openIt} setOpenIt={setOpenIt} />
    </>
  )
}

export default Login