import React, { useState, useEffect } from 'react'
import {
    Stack, Typography,
 } from "@mui/material"
 import { useAppContext } from "../../../context/appContext"
 import { useNavigate } from "react-router-dom"
 import ProdCard from './ProdCard'
 import * as typing from "../../../types/appTypes"

const Everything = () => {

    const navigate = useNavigate()
    
    const { token, exploreProducts, getExploreProducts, logout, filterExploreProducts } = useAppContext()

    const [exploreProds, setExploreProds ] = useState<typing.prodInterface['prod'][]>(exploreProducts)


    const filterProds = (genderParameter: string[], categoryParameter: string[], priceParameter: number) => {
        if(genderParameter.length === 0 && categoryParameter.length === 0 && priceParameter === 0){
            return setExploreProds(exploreProducts)
        }
        const products = exploreProducts
        const filteredProducts = products.filter((prod: typing.prodInterface["prod"]) => {
            let catBool = categoryParameter.length> 0 ? categoryParameter.indexOf(prod?.categoryId.name) !== -1 : true
            let genBool = genderParameter.length> 0 ? genderParameter.indexOf(prod?.genderId.name) !== -1 : true
            let priceBool = priceParameter > 0 ? prod.price <= priceParameter : true
            return genBool && catBool && priceBool
        })
        setExploreProds([...filteredProducts])
    }

    const anotherTake = async()=> {
        if(exploreProds.length === 0){
            const willNavigate = await getExploreProducts(token, "products")
            if(typeof willNavigate === 'string' && willNavigate.includes("error")){ 
                await logout()
                navigate('/login')
            }else if(willNavigate){
                filterProds(filterExploreProducts.gender, filterExploreProducts.category, filterExploreProducts.price)   
            }
        }else{
            filterProds(filterExploreProducts.gender, filterExploreProducts.category, filterExploreProducts.price)
        }
    }
    
    useEffect(() => {
        anotherTake()
    },[exploreProducts, filterExploreProducts])




    const mappedProds  = exploreProds.map((product, index)=>{
        return(
        <React.Fragment key={index}>
            <ProdCard prod={product}/>

        </React.Fragment>)
    })

    
  return (
    <Stack sx={{
        mt: 2, 
        width:"390px", 
        display:"flex",
        flexDirection:"column",
        backgroundColor: "#fff",
        boxSizing:"border-box",
        borderRadius: "10px",
        p:1
    }}>
        <Typography variant="subtitle2">Browse</Typography>
        <Stack sx={{
            mt: 1, 
            maxWidth:"100%", 
            display:"flex",
            flexDirection:"row",
            flexWrap: "wrap",
        }}>
            {mappedProds}
        </Stack>
    </Stack>
  )
}

export default Everything