import { Box, FormControlLabel, Slide, Switch } from '@mui/material'
import React from 'react'
import '../componentCss/Texts.css'

interface forTextBubble{
  ogt: string;
  index: number
}

const TextBubble: React.FC<forTextBubble> = ({ogt, index}) => {
  return (
    <div className={index%2===1?"igt":"ogt"}>
        <Box 
        className="textyText"
        sx={{ 
            maxWidth:'80%',
            Width: '30px',
            color: 'white',
            backgroundColor: '#1a75ff',
            borderRadius: '15px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pl: '10px',
            pr: '10px',
            pt: '5px',
            pb: '5px'
         }}
        >
            {/* <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show from target"
            />
             */}

            {ogt}
        </Box>
  </div>
  )
}

export default TextBubble