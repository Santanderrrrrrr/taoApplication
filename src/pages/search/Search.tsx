import React from 'react'
import { Box, Divider, Stack, 
    
} from '@mui/material'
import SelectTextFields from './searchComponent/SelectTextFields'
import CatChips from './categoryComponent/CatChips'
import './css/search.css'
import logo from '../../assets/logo.png'


const Search = () => {

    

  return (
    <div className="scaffolding">
        <Stack 
            sx={{
                width:'390px',
                height: '100vh'
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection:"column", 
                    alignItems: 'flex-start'
                }}
            >    
                <div className='searchHeading'>
                    <div className='byjLogoSearch'>
                        <img className='logoItselfSearch' src={logo} alt='Bei Ya Jioni logo'/>
                    </div>
                </div>
                <Box className="searchBox"
                    sx={{ 
                        position: 'sticky', 
                        top: 65, 
                        display: 'flex', 
                        flexDirection: 'row', 
                        boxSizing: 'border-box', 
                        borderRadius:'10px'
                    }}
                    >
                    <SelectTextFields/>
                </Box>

                <CatChips/>
            </Stack>
            <Stack>

            </Stack>
        </Stack>
    </div>
  )
}

export default Search