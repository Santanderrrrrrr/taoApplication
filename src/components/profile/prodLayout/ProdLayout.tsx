import React, { useEffect, useState } from 'react'

interface ForProdLayout{
    persId: string | undefined
}

type prodInterface = {
    prod: {
        
    } | null
}

const ProdLayout: React.FC<ForProdLayout> = ({persId}) => {

    const [accessToken, setAccessToken] = useState<string>((JSON.parse(localStorage.getItem('accessToken') as string)))
    const [ products, setProducts ] = useState<prodInterface['prod']>(null)


    useEffect(()=>{
        //fetching the user products
        if(persId)(
            
            async()=>{
                try{    
                    console.log(persId)
                    await fetch(`${process.env.REACT_APP_BYJ_API_URL}/products/${persId}`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                            },
                        credentials: 'include',
                        })
                    .then((data)=>setProducts(data))
                }catch(e){
                    console.log(e)
                }
            }
        )()
    },[persId])
  return (
    <div>ProdLayout</div>
  )
}

export default ProdLayout