import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import './css/UploadProd.css'


const UploadProd = () => {
  return (
    <div className="backdrop">
      <Box sx={{ 
        width: '100%', 
        height: '100vh', 
        display:'flex', 
        justifyContent: 'center', 
        m:0, 
        p:0 
        }}>
        <Stack className='activeArea' sx={{
          width: '390px', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          mt:'5px', 
          // backgroundColor: 'red'
          }}> 
          <Stack className='heading' sx={{
            width:'350px', 
            height: '200px', 
            // backgroundColor: '#222',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-start',
            borderRadius:'15px',
            mt:2
            }}> 
              <div className='logoDiv'>
                <img className="logoItself" src={logo} alt='logo'/>            
              </div>
              <Typography variant='subtitle2' sx={{ml:2, color:'white'}}>NEW PRODUCT</Typography>
          </Stack>
          <Stack>
          <Box component="form" noValidate  sx={{ mt: 3 }}> 
          {/* onSubmit={handleSubmit} */}
            
            <Grid >
              <Grid className='prodName'>
                <TextField
                  autoComplete="given-name"
                  name="prodName"
                  required
                  fullWidth
                  id="prodName"
                  label="Product Name"
                  autoFocus
                  // onChange={(e) => setFirstname(e.target.value)} value={firstname}
                />
              </Grid>

              <Grid className='prodDesc'>
                <TextField
                  required
                  multiline
                  id="prodDesc"
                  label="Description"
                  name="prodDesc"
                  rows={4}
                  // onChange={(e) => setLastname(e.target.value)} value={lastname}
                />
              </Grid>

              <Grid className='price'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {'kes'}
                  <TextField 
                    id="price" 
                    label="price" 
                    variant="standard" />
                </Box>
              </Grid>

              <Grid className="inventory">
                <TextField
                  required
                  fullWidth
                  id="inventory"
                  label="Amount Available"
                  name="inventory"
                  autoComplete="email"
                  // onChange={(e) => setEmail(e.target.value)} value={email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephone"
                  label="Tel. number"
                  name="telephone"
                  autoComplete="Phone"
                  // onChange={(e) => setTelephone(e.target.value)} value={telephone}

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
                  // onChange={(e) => setPassword(e.target.value)} value={password}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#1a75ff', mt: 3, mb: 2 }}
            >
              Add To My Kiosk
            </Button>
            
          </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

export default UploadProd