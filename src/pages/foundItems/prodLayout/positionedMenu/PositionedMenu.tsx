import React from 'react'
import {Menu, MenuItem} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WarnModal from '../warnModal/WarnModal'
import Edit from '../../../Edit/Edit'
import { useAppContext } from '../../../../context/appContext'
import * as typing from '../../../../types/appTypes'

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          // border: '1px solid rgba(247, 247, 247, 1)',
        },
      },
    },
  },
});

export default function PositionedMenu(props: typing.ForPositionedMenu) {
  
  const { setAnchorEl, anchorEl, ouvrir, prodId } = props

  const{ closeModal, openModal } = useAppContext()
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete =(prodId: string)=>{
    openModal('delWarning', prodId)
    handleClose()
    closeModal('prodModal')
  }

  const handleEdit=(prodId: string)=>{
    console.log(prodId)
    openModal('edit', prodId)
    handleClose()
    // closeModal('prodModal')
  }

  return (
    <div style={{border: '2px solid #48'}}>    
    <ThemeProvider theme={theme}>
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
          elevation={1}
          
        >
          <MenuItem onClick={()=> handleEdit(prodId)}>Edit this product</MenuItem>
          <MenuItem onClick={()=>handleDelete(prodId)}>Delete this product</MenuItem>
        </Menu>
      </ThemeProvider>
      <WarnModal prodId={prodId}/>
      <Edit />
    </div>
  );
}