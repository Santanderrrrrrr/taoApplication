import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../../../context/appContext'
import Fade from '@mui/material/Fade';
import * as typing from '../../../types/appTypes'

interface forSelectMenu extends typing.ForPositionedMenu{
}

const SelectMenu: React.FC<Partial<forSelectMenu>> = ({ setAnchorEl, anchorEl, ouvrir}) => {

    const { setSearchType } = useAppContext()

    const handleClose = (type: string) => {
        // console.log(type)
        setSearchType?.(type)
        setAnchorEl?.(null);
    };

  return (
    <div>
        <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={(ouvrir as boolean)}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={()=>handleClose("users")}>Search People</MenuItem>
            <MenuItem onClick={()=>handleClose("products")}>Search Products</MenuItem>
        </Menu>
    </div>
  )
}

export default SelectMenu