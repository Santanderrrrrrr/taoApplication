import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useAppContext } from "../../../context/appContext"

const Product = () => {

  const { productId } = useParams()

  const { productToView, token, currentUser, doFollow } = useAppContext()
  
  useEffect(()=>{
    // console.log(productToView)
  }, [])

  return (
    <div>Product</div>
  )
}

export default Product