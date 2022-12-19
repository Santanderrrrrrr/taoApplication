import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import { useAppContext } from '../../../context/appContext'
import UserResultChip from './UserResultChip'
import ProductResultChip from './ProductResultChip'
import * as typing from '../../../types/appTypes'

const Results = () => {

    const { searchUsersResults, searchProductsResults, searchType } = useAppContext()

    useEffect(() =>{

    },[searchUsersResults, searchProductsResults])

  return (
    <>
        {/**Responsible for the results beign displayed below the search bar */}
        <Stack className="resultSegment"
            	sx={{
                    
                }}
        >
            <Stack className='resultCards'
                sx={{
                    width: '360px', 
                    height:'120px', 
                    mt: 4, 
                    borderRadius: '15px', 
                    display:'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    backgroundColor: 'white',
                    // filter:"drop-shadow(0 1px 0px rgba(1, 81, 161, 0.5))"
                }}>
                    {searchType === "users" && searchUsersResults.map(( result: typing.theUser['user'], index: number)=>{
                        return <UserResultChip key={index} result={result}/>
                    })}
                    {searchType === "products" && searchProductsResults.map(( result: typing.prodInterface['prod'], index: number)=>{
                        return <ProductResultChip key={index} prod={result}/>
                    })}
            </Stack>

        </Stack>
    </>
  )
}

export default Results