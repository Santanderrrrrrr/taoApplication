import { useEffect, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import { useAppContext } from '../../context/appContext'
import * as typing from '../../types/appTypes'
import logo from '../../assets/logo.png'
import './css/Edit.css'





const Edit: React.FC = () => {

  const { token, displayProd, editModalOpen, closeModal, editProd } = useAppContext()


  //state for the change uploads
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [brand, setBrand] = useState<string | undefined>(undefined)



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

  const handleClose = () => {
      setName('')
      setDescription('')
      setCategory('')
      setSize('')
      setGender('')
      setPrice(undefined)
      setBrand(undefined)
      closeModal('edit')
    }

  const salvageable = [
    name,
    description,
    category, 
    size, 
    gender,
    price,
    brand
        ].some(Boolean)

  const handleEdit = async(event: { preventDefault: () => void })=>{
    event.preventDefault()

    if(salvageable){    
       try{
            let changes:typing.changesKeys  = {
                name,
                description,
                category, 
                size, 
                gender,
                price,
                brand
            }
            for(let [key, value] of Object.entries(changes)){
                if(!Boolean(value)){
                    delete changes[key as keyof typing.changesKeys]
                }
            }
            editProd(changes, displayProd._id, token, displayProd.sellerId._id)

        }catch(error){

        }
    }
    handleClose()
  }




  return (
    
        <Modal
        open={editModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { backgroundColor: "rgba(137,196,244,0.2)" } }}>
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
                

                {displayProd?.images?.length>0 && (
                <Stack className='imagesToUpload'
                    sx={{width: '350px', height:'120px', mt: 2, borderRadius: '15px', display:'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7'}}>
                    {displayProd.images!.map((prev: string, index: number)=>{
                        return <img key={index} src={prev} alt={`product pic number ${index} to upload`} className="prodImg" />
                    })}
                    
                </Stack>)}
                
                <Box component="form" noValidate onSubmit={handleEdit} sx={{ mt: 3 }}> 
                
                    
                    
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
                            onChange={(e) => setName(e.target.value)} defaultValue={displayProd?.name}
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
                            onChange={(e) => setDescription(e.target.value)} defaultValue={displayProd?.description}
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
                                onChange={(e) => setPrice(Number(e.target.value))} defaultValue={displayProd?.price}
                                />
                                
                            </Box>
                            </Stack>
                            <Grid className="brand" sx={{
                            mt:2,
                            ml: 2,
                            width: '152px',
                            display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'            
                            }}>
                            <TextField
                                required
                                fullWidth
                                id="brand"
                                label="brand"
                                name="brand"
                                
                                sx={{ backgroundColor: 'white'}}
                                onChange={(e) => setBrand(e.target.value)} defaultValue={displayProd?.brand}
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
                                        defaultValue={displayProd?.categoryId?.name}
                                    >
                                        {gimmeItems('category')}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ml: 2, width: '152px'}}>
                                    <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        label="Size"
                                        sx={{ width:'152px', backgroundColor: 'white'}}
                                        onChange={(e)=> setSize(e.target.value as string)}
                                        defaultValue={displayProd?.sizeId?.name}
                                    >
                                        {gimmeItems('size')}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ml: 2, width: '152px', mt: 2}}>
                                    <InputLabel id="demo-controlled-open-select-label">Sex</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        label="Sex"
                                        sx={{ width:'152px', backgroundColor: 'white'}}
                                        onChange={(e)=> setGender(e.target.value as string)}
                                        defaultValue={displayProd?.genderId?.name}
                                    >
                                        {gimmeItems('gender')}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Stack>
                        <Stack className="delAndCancel" sx={{width:'350px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: "#03ac13" }, backgroundColor: '#5dbb63', width:'120px', mt: 3, mb: 2, mr: 3 }}
                                >
                                Commit
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                onClick={handleClose}
                                sx={{ "&:hover": { backgroundColor: "#fcfcfc" }, width:'120px', mt: 3, mb: 2 }}
                                >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>  
                    
                    
                </Box>
                
                </Stack>
            </Box>
        </Modal>
  )
}

export default Edit