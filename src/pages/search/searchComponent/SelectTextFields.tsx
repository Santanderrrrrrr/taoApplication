import React, { useState, useMemo } from 'react'
import { FormControl,
    Typography,
    OutlinedInput,
    InputAdornment,
    IconButton, 
    Stack, 
    Button,
    Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SelectMenu from './SelectMenu'
import Results from '../resultComponent/Results'
import { useAppContext } from '../../../context/appContext'

const SelectTextFields = () => {

    const { token, doTheSearch, searchType } = useAppContext()
    
    const [searchValue, setSearchValue ] = useState<string>('')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleSetAnchor = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSearch =(e: { preventDefault: () => void }, searchType: string, searchValue: string)=>{
        e.preventDefault()
        switch (searchType) {
            case "products":
                doTheSearch("products", searchValue, token)
                break;
            case "users":
                doTheSearch("users", searchValue, token)        
                break;
            default:
                console.log("No search Value detected")
                break;
        }
    }


    const debounce = () => {
        let timeoutID: ReturnType<typeof setTimeout>
        return (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value)
          const st = searchType
          const sv = e.target.value
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleSearch(e, st, sv);
          }, 1000);
        };
      };
      
    const optimizedDebounce = useMemo(() => debounce(), [searchType, searchValue]);



        
  return (
    <>
        <Box>
            {/**Responsible for the search bar up top */}
            <Stack className="searchSegment"
                sx={{
                    display: "flex",
                    flexDirection:"row"
                }}
                >
                <Stack 
                    component="form"
                    onSubmit={(e)=>handleSearch(e, searchType, searchValue)}
                    sx={{
                        // zIndex: 15,
                        backgroundColor: "white",
                        borderRadius: '5px',
                        width: '100%', 
                        display: 'flex',
                        flexDirection:'row'
                    }}>
                    <FormControl sx={{  width: '100%' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-search"
                            type={'text'}
                            placeholder={searchType === ""? "people or products?": searchType === "products" ? "search products" : "search people"}
                            disabled = {searchType === ""? true : false}
                            onChange={optimizedDebounce}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleSetAnchor}
                                        edge="end"
                                    >
                                        {searchType === "" ? <KeyboardArrowDownIcon/> : searchType === "users"? <SupervisorAccountIcon /> : <CheckroomIcon />}
                                    </IconButton>
                                    <SelectMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} ouvrir={open} />
                                </InputAdornment>
                            }
                            // label="Search"
                        />
                    </FormControl>
                </Stack>
                <Button
                    type="submit"
                    onClick ={(e)=>handleSearch(e, searchType, searchValue)}
                    sx={{
                        color:"white",
                    }}
                >
                    Go!
                </Button>
            </Stack>
            {searchValue.length>0 && <Results/>}
        </Box>
    </>
  )
}

export default SelectTextFields