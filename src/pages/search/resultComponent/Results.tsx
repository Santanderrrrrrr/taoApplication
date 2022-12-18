import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import { useAppContext } from '../../../context/appContext'
import ResultChip from './ResultChip'
import * as typing from '../../../types/appTypes'

const Results = () => {

    const { searchUsersResults } = useAppContext()

    useEffect(() =>{

    },[searchUsersResults])

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
                    {searchUsersResults.length>0 && searchUsersResults.map(( result: typing.theUser['user'], index: number)=>{
                        return <ResultChip key={index} result={result}/>
                    })}
            </Stack>

        </Stack>
    </>
  )
}

export default Results