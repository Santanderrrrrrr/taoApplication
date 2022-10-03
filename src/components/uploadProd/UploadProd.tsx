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
            
            
            <Stack sx={{
              width: '350px', 
              // height: '100px', 
              backgroundColor: '#f7f7f7',
              borderRadius: '15px',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',}}>
              <Grid className='prodName' sx={{
                mt:3,
                ml: 2,
                width: '320px'                
              }}>
                <TextField
                  name="prodName"
                  required
                  fullWidth
                  id="outlined"
                  label="Product Name"
                  autoFocus
                  sx={{ backgroundColor: 'white'}}
                  // onChange={(e) => setFirstname(e.target.value)} value={firstname}
                />
              </Grid>
              <Grid className='prodDesc' sx={{
                mt:2,
                ml: 2,
                width: '320px'                
              }}>
                <TextField
                  required
                  multiline
                  fullWidth
                  id="prodDesc"
                  label="Description"
                  name="prodDesc"
                  sx={{ backgroundColor: 'white'}}
                  rows={4}
                  // onChange={(e) => setLastname(e.target.value)} value={lastname}
                />
              </Grid>
              <Stack className='priceAndInventory' sx={{ display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Stack className='price'  sx={{
                  mt:2,
                  ml: 2,
                  width: '152px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'            
                }}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {'KES'}
                    <TextField 
                      required
                      id="price" 
                      label="price" 
                      // variant="standard"
                      fullWidth
                      sx={{ backgroundColor: 'white', ml: 1}} />
                  </Box>
                </Stack>
                <Grid className="inventory" sx={{
                  mt:2,
                  ml: 2,
                  width: '152px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'            
                }}>
                  <TextField
                    required
                    fullWidth
                    id="inventory"
                    label="inventory"
                    name="inventory"
                    autoComplete="email"
                    
                    sx={{ backgroundColor: 'white', ml: 1}}
                    // onChange={(e) => setEmail(e.target.value)} value={email}
                  />
                </Grid>
              </Stack>

              <Grid className='category' sx={{
                mt:2,
                ml: 2,
                width: '320px'                
              }}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Product Category"
                  name="category"
                  autoComplete="Phone"
                  sx={{ backgroundColor: 'white'}}
                  // onChange={(e) => setTelephone(e.target.value)} value={telephone}

                />
              </Grid>
              <Grid className='images' sx={{
                mt:2,
                ml: 2,
                mb: 2,
                width: '320px'
              }}>
                <TextField
                  required
                  fullWidth
                  name="images"
                  label="images"
                  type="password"
                  id="images"
                  sx={{ backgroundColor: 'white'}}

                  // onChange={(e) => setPassword(e.target.value)} value={password}
                />
              </Grid>
            </Stack>  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: 'rgb(9,29,150)', width:'350px',  mt: 3, mb: 2 }}
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