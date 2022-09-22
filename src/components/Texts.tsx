import { Box, Button, FormControlLabel, Slide } from '@mui/material'
import React, { useState } from 'react'
import './componentCss/Texts.css'
import TextBubble from './forOutgoing/TextBubble'

const OutgoingTexts = () => {
  
  const [ outGoingTexts, setOutGoingTexts ] = useState<string[]>(
    [
      'Yo...', 
      "Hey man, how's you?",
      "Chillin, You mentioned a spot I could buy and sell clothes at..?", 
      "Yeah, Just click register!",
      'wazi!' ])

  return (
    <div className="encasing">
      
      {outGoingTexts.map((ogt, index)=>{
        return(
          <>
            <TextBubble key={index} index={index} ogt={ogt}/>
          </>
        )})} 
    </div>
    
  )
}

export default OutgoingTexts