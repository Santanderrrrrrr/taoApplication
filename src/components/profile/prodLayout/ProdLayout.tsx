import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './prodlayout.css'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'
import { MoreVert } from '@mui/icons-material'

const fontSizeTheme = createTheme({
    typography: {
        caption: {
          fontSize: 10,
        },
    }
})

interface ForProdLayout{
    persId: string | undefined
}

type prodInterface = {
    prod: {
        _id: string,
        categoryId: {
            _id: string
            name: string
        },
        sizeId: {
            _id: string
            name: string
        },
        genderId: {
            _id: string
            name: string
        },
        sellerId: {
            _id: string
            username: string
        },
        createdAt: string,
        description: string,
        inventory: number,
        name: string,
        price: number,
        updatedAt: string,
        images: string[]    
    }
}

const ProdLayout: React.FC<ForProdLayout> = ({persId}) => {

    const [accessToken, setAccessToken] = useState<string>((JSON.parse(localStorage.getItem('accessToken') as string)))
    const [ products, setProducts ] = useState<prodInterface['prod'][]>([])


    useEffect(()=>{
        //fetching the user products
        if(persId)(
            
            async()=>{
                try{    
                    // console.log(persId)
                    await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products/u/${persId}`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                            },
                        credentials: 'include',
                        })
                    .then((deets) => deets.json())
                    .then((data)=>{
                        setProducts([...data])
                        // console.log(data)                        
                    })
                }catch(e){
                    console.log(e)
                }
            }
        )()
    },[persId])

    


    const mappedprods = products!.map((product, index)=>{
        const prodDate = new Date(product.createdAt).toString().substring(0, 15)
        return(
            <React.Fragment key={index}>
                {/* <h3 >{product.name}</h3> */}
                    <Box 
                        className={ index%2 === 0 && index == products.length-1?  "oddLastProdListItem" : "prodListItem"}
                        sx={{ 
                            borderRadius: '10px',
                            border: '1px solid rgb(247,247,247)',
                            backgroundColor: 'rgb(247,247,247)',
                            // m: 'auto',
                            mb: 1, 
                            zindex: 13,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Carousel
                            className="carousel"
                            next={ (next, active) => null }
                            prev={ (prev, active) => null } 
                            indicators={false}   
                            autoPlay={false}      
                            animation="fade"
                            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                                style: {
                                    backgroundColor: 'rgba(255, 255, 255, 0)',
                                    borderRadius: 0
                                    // display: 'none'
                                }
                            }} 
                            sx={{width: '175px', height: '150px'}}
                            NextIcon={<ArrowForwardIos/>}
                            PrevIcon={<ArrowBackIos/>}
                            >
                                {product.images.map((img, index)=>{
                                return (
                                <Stack className="carouselDiv" key={index} sx={{ width: '175px', height: '100%', display: 'flex', direction:'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        className="carouselImg"
                                        style={{ maxHeight: "150px"}}
                                        src={img}
                                        alt={product.name}
                                    />
                                </Stack>)
                                })}
                        </Carousel>
                        <Stack sx={{ display: 'flex', justifyContent: 'flex-start', mt:1, mr: 'auto', ml: 1, mb: 1, color: '#048'}}>
                            <Typography variant='body2' sx={{mb: 1}}>{product.name}</Typography>
                            <Typography variant='subtitle2' sx={{mb: 1}}><b>kes</b> {product.price}</Typography>    
                            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                                <ThemeProvider theme={fontSizeTheme}>
                                    <Typography variant='caption' sx={{mb: 1}}>{prodDate}</Typography>    
                                </ThemeProvider>
                                <MoreVert sx={{mb: 1, mr:1}}/>
                            </Stack>
                        </Stack>
                    </Box>
                    
            </React.Fragment>
        )
    })
    

  return (
    <>
        <Typography variant="subtitle2" sx={{color: '#048', m: 1}}>Products</Typography>
        <div className="prodContainer">
            {mappedprods}
        </div>
    </>
  )
}

export default ProdLayout