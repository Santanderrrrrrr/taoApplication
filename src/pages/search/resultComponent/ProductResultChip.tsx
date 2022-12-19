import React from 'react'
import { Box, Stack, Divider, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../../context/appContext"
import * as typing from '../../../types/appTypes'
import '../css/searchProd.css'

const ProductResultChip: React.FC<typing.prodInterface> = ({prod: result}) => {

    const navigate = useNavigate()

    const { getTheView, searchType, token } = useAppContext()

    const handleShowProduct = async (prodId: string)=>{
        const canNavigate = await getTheView(prodId, token, searchType)
        if (canNavigate) return navigate(`/p/${result?._id}`)
    }

  return (
    <>
        <Box
            onClick={()=>handleShowProduct(result?._id as string)}
            sx={{
                boxSizing:"border-box",
                ml: 1,
                // minWidth: "300px",
                width: "300px",
                height: "90%",
                borderRadius: "10px",
                backgroundColor:"#fff",
                display:"flex", 
                flexDirection:"row", 
                alignItems: 'center',
                jusifyContent: "space-between",
                "&.MuiBox-root:hover":{
                    backgroundColor: "#e8f2fc"
                },
                filter:"drop-shadow(0 1px 0px rgba(1, 81, 161, 0.5))"
            }}
        >
            <Stack sx={{ml: 1}}>
                <img  className="resultPic" src={result?.images[0]} alt={`${result?.sellerId?.username} product`}/>
            </Stack>
            <Divider 
                sx={{ml:1}}
                orientation="vertical"
                variant="middle"
                flexItem
            />
            <Stack sx={{ maxHeight: "100%", width: "180px", display: "flex", flexDirection: "column", alignItems: "flex-start", mr: 1, ml: 1}}>
                <Typography variant="button">{result?.name}</Typography>
                <Typography variant="body2">{`${result?.description.substring(0, 50)}...`}</Typography>
                <Stack 
                    sx={{ 
                        width: "80%", 
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "flex-start",
                        backgroundColor: "#f7f7f7",
                        borderRadius: "5px",
                        p:0, 
                        mt:1
                    }}>
                    <Typography 
                        variant="subtitle2"
                        sx={{
                            color: "#048",
                            ml: 1
                        }}
                    >
                            {`kes ${result?.price}`}
                    </Typography>

                </Stack>
            </Stack>
            
        </Box>
    </>
  )
}

export default ProductResultChip