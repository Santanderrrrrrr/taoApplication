import React from 'react'
import { useAppContext } from '../../../../context/appContext'
import {Menu, MenuItem} from '@mui/material';
import * as typing from '../../../../types/appTypes'

export default function PositionedMenu(props: typing.ForPositionedMenu) {
  
  const { setAnchorEl, anchorEl, ouvrir, prodId } = props

  const{ token, currentUser, deleteProd, closeModal } = useAppContext()
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete =(prodId: string)=>{
    deleteProd(prodId, token, currentUser._id)
    handleClose()
    closeModal('prodModal')
  }

  return (
    <div>    
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={ouvrir}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{border:'1px solid rgba(247,247,247, 1)'}}
        elevation={0}
      >
        <MenuItem onClick={handleClose}>Edit this product</MenuItem>
        <MenuItem onClick={()=>handleDelete(prodId)}>Delete this product</MenuItem>
      </Menu>
    </div>
  );
}