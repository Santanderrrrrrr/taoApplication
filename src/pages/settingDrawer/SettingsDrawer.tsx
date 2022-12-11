import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack, SwipeableDrawer, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom'
import { useAppContext } from "../../context/appContext"
import logo from "../../assets/logo.png"
import './settingsDrawer.css'

const SettingsDrawer = () => {

    const { settingsDrawerOpen, openModal, closeModal, logout } = useAppContext()
    const navigate = useNavigate()

    const [password, setPassword] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");

    const handleSubmit =() => {

    }

    const handleLogout = async () => {
      const isLoggedOut = await logout()
      if(isLoggedOut){
        navigate('/login')
      }
    }

    const editProfile = ()=>{
      return (
        <>
          <Box component="form" noValidate onSubmit={handleSubmit} 
            sx={{ mt: 3, display: 'flex', flexDirection:'column', alignItems: "center" }}>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="Username"
                  onChange={(e) => setUsername(e.target.value)} value={username}

                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ backgroundColor: 'rgba(9,29,150,1)', mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
            
          </Box>
        </>
      )
    }

    const accordions = ()=>{
      return (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Edit Personal Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {editProfile()}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </>
      )
    }

  return (
    <SwipeableDrawer anchor='right' onClose={()=> closeModal('settings')} onOpen={()=> openModal('settings')} open={settingsDrawerOpen} 
        PaperProps={{
            sx:{
                display:'flex',
                flexDirection: "column",
                alignItems: "center",
                // backgroundColor: "red",
                width:'390px',
                height: '100vh',
                position:'absolute',
                ml: 'auto',
                mr:'auto',
                borderTopLeftRadius: '15px',
                borderBottomLeftRadius: '15px',
            }
        }}>
          <>
            <Stack
              sx={{
                width: "100%", 
                display: "flex", 
                flexDirection:"row", 
                justifyContent: "space-between", 
                pl: 2, pr:2,
                boxSizing: "border-box"
              }}
            >
              <div className='byjLogoSd'>
                <img className='logoItselfSd' src={logo} alt='Bei Ya Jioni logo'/>
              </div>
              <Button 
                sx={{color: "#cc0000"}}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Stack>
            <Stack sx={{
              maxWidth: '85%',
            }}>
              {accordions()}
            </Stack>
            <Stack>

            </Stack>
          </>
    </SwipeableDrawer>
  )
}

export default SettingsDrawer