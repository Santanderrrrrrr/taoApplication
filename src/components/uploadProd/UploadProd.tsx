import { useEffect, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import './css/UploadProd.css'


const UploadProd = () => {

  const [theImages, setImages] = useState<Blob[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const gimmeItems = (parameter: string) => {
    let categories = ['outerwear', 'suits and blazers', 'tousers', 'leggings', 'socks', 'underwear','activewear', 'jeans', 'tops and tshirts', 'jumpers and sweatshirts', 'shorts', 'cropped pants','swimwear', 'costumes and special outfits', 'dresses', 'jumpsuits and rompers', 'lingerie', 'nightwear', 'skirts', 'pajamas', 'maternity clothes', 'baby clothes'];
    let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL' ]
    let gender =['Male', 'Female', 'Unisex']
    switch (parameter) {
      case 'category':
        return categories.map((cat, index)=>{
          return <MenuItem key={index} value={cat}>{cat}</MenuItem>
        })
      case 'size':
        return sizes.map((size, index)=>{
          return <MenuItem key={index} value={size}>{size}</MenuItem>
        })
      case 'gender':
        return gender.map((sex, index)=>{
          return <MenuItem key={index} value={sex}>{sex}</MenuItem>
        })
    
      default:
        break;
    }
    
  }

  function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
        
    if(!event!.target.files) {return}
    else{
      for (let i=0; i<event.target.files.length; i++) {
        let file= event.target.files[i]
        if (file.size >= 3048576) {
            return alert("one of the images is larger than 2.5mbs. It's too big.");
        }else{
          setImages(state=>[...state.concat(file)]);
          setImagePreviews(state=>[...state.concat(URL.createObjectURL(file))]);
        }
      }
      
    }
  }

  

  useEffect(() => {
    console.log(theImages.length)
    console.log(imagePreviews.length)

  }, [theImages])
  

  

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
          <Button className='heading' variant="contained" component="label" sx={{
            width:'350px', 
            height: '200px',
            // border: '2px solid white',
            borderRadius:'15px',
            mt:2,
            }}> 
            <Stack className='stackInButton' >
              <input hidden accept="image/*" multiple type="file" onChange={validateImg}/>
              <Stack className="logoNewProduct" sx={{
                height: '50px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-start',
              }}>
                <div className='logoDiv'>
                  <img className="logoItself" src={logo} alt='logo'/>            
                </div>
              </Stack>
              <Stack className='photoCameraStack'>
                <PhotoCamera/>
                <Typography variant='subtitle2' sx={{ color:'white'}}>Click here to add pictures</Typography>
              </Stack>
            </Stack>

          </Button>

          {imagePreviews.length>0 && <Stack className='imagesToUpload'
            sx={{width: '350px', height:'110px', mt: 2, borderRadius: '15px', display:'flex', flexDirection: 'row'}}>
              {imagePreviews!.map((prev, index)=>{
                return <img key={index} src={prev} alt={`product pic number ${index} to upload`} className="prodImg" />
              })}
              
          </Stack>}
          
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
                  label="The product's name is..."
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
                  placeholder="Give a short description of the product you're about to sell"
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
                    label="Inventory"
                    name="inventory"
                    autoComplete="email"
                    
                    sx={{ backgroundColor: 'white'}}
                    // onChange={(e) => setEmail(e.target.value)} value={email}
                  />
                </Grid>
              </Stack>

              <Stack className='categoryAndSize' sx={{
                display:'flex',
                flexDirection:'row',
                mb: 2
              }}>
                <Grid className='category' sx={{
                  mt:2,
                  ml: 2,
                  width: '320px'                
                }}>
                    <FormControl>
                      <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                      <Select
                        required
                        // open={false}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Category"
                        // name='category'
                        sx={{ width:'152px', backgroundColor: 'white'}}
                      >
                        {gimmeItems('category')}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ml: 2, width: '152px'}}>
                      <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                      <Select
                        required
                        // open={false}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Size"
                        // name='Size'
                        sx={{ width:'152px', backgroundColor: 'white'}}
                      >
                        {gimmeItems('size')}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ml: 2, width: '152px', mt: 2}}>
                      <InputLabel id="demo-controlled-open-select-label">Sex</InputLabel>
                      <Select
                        required
                        // open={false}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Sex"
                        // name='Sex'
                        sx={{ width:'152px', backgroundColor: 'white'}}
                      >
                        {gimmeItems('gender')}
                      </Select>
                    </FormControl>
                </Grid>
                
                

              </Stack>
              
              {/* <Grid className='images' sx={{
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
              </Grid> */}
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
      </Box>
    </div>
  )
}

export default UploadProd