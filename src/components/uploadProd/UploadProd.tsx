import { useEffect, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import './css/UploadProd.css'


interface ForUploadProd{
  accessToken: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  persId: string

}

const UploadProd: React.FC<ForUploadProd> = ({accessToken, setAccessToken}) => {

  //state for the form uploads
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [inventory, setInventory] = useState<number | undefined>(undefined)
  const [uploadingImg, setUploadingImg] = useState<boolean>(false);


  
  //state for the images
  const [theImages, setImages] = useState<Blob[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([])


  //this fills in the menu items for the selects
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

  //this ensures image sizes are limited to 3mbs
  function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
        
    if(!event.target.files) {return}
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

  //this uploads images to cloud 
  async function uploadImgs(){
    let theForm = new FormData()
    setUploadingImg(true);
    try{
      let imageArray = []
      for(let i = 0; i< theImages.length; i++){
        let file = theImages[i]
        theForm.append("file", file);
        theForm.append("upload_preset", "productImgs");
        let res = await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
          method: "POST",
          body: theForm
        });
        const imageData = await res.json();
        imageArray.push(imageData.url)
      }
      setUploadingImg(false);
      return imageArray
    }catch(error){
      setUploadingImg(false);
      console.log(error);
      return undefined
    }
  }

  const handleSubmit = async(event: { preventDefault: () => void }) => {
    event.preventDefault();
     
    if (!name ||
        !description ||
        !category ||
        !size ||
        !gender ||
        !price ||
        !inventory) return alert(' All fields of the form need to be filled! ')
        if(!theImages) return alert(' You must provide product images! ')
        let urls: string[] | undefined = await uploadImgs()
        
        if (uploadingImg=== false) {
          try{
            let accessToken = localStorage.getItem('accessToken')
            accessToken = JSON.parse(accessToken as string)
            let requestData = JSON.stringify({
              name: name,
              description: description,
              category: category,
              size: size,
              gender: gender,
              price: price,
              inventory: inventory,
              images: urls
              })
                  
            fetch(`${process.env.REACT_APP_BYJ_API_URL}/products`,{
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  // eslint-disable-next-line no-useless-concat
                  'Authorization': 'Bearer ' + `${accessToken}`,
                },
              method: 'POST',
              body: requestData,
              credentials: 'include'
            })
            
          }catch(error){
            console.log(error)
          }
        }
  }

  

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
          
          }}> 
          {/* //click to add images */}
          <Button className='heading' variant="contained" component="label" sx={{
            width:'350px', 
            height: '200px',
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

          {imagePreviews.length>0 && (
          <Stack className='imagesToUpload'
            sx={{width: '350px', height:'120px', mt: 2, borderRadius: '15px', display:'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7'}}>
              {imagePreviews!.map((prev, index)=>{
                return <img key={index} src={prev} alt={`product pic number ${index} to upload`} className="prodImg" />
              })}
              
          </Stack>)}
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> 
          
            
            
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
                  onChange={(e) => setName(e.target.value)} value={name}
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
                  onChange={(e) => setDescription(e.target.value)} value={description}
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
                      sx={{ backgroundColor: 'white', ml: 1}} 
                      onChange={(e) => setPrice(Number(e.target.value))} value={price}
                      />
                      
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
                    onChange={(e) => setInventory(Number(e.target.value))} value={inventory}
                  />
                </Grid>
              </Stack>

              <Stack className='categorySizeSex' sx={{
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
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label="Category"
                        sx={{ width:'152px', backgroundColor: 'white'}}
                        onChange={(e)=> setCategory(e.target.value as string)}
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
                        onChange={(e)=> setSize(e.target.value as string)}

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
                        onChange={(e)=> setGender(e.target.value as string)}

                      >
                        {gimmeItems('gender')}
                      </Select>
                    </FormControl>
                </Grid>
              </Stack>
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