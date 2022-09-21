import React from 'react'
import { Drawer, Button, Placeholder } from 'rsuite';

interface properties{
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SwipeableDrawer: React.FC<properties> = ({open, setOpen}) => {

  

  

  return (
    <>
        
    <Drawer size={`lg`} placement={'bottom'} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export default SwipeableDrawer