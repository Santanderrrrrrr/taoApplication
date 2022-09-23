import React, { useState } from 'react'
import './componentCss/Texts.css'
import TextBubble from './forOutgoing/TextBubble'

const OutgoingTexts = () => {
  
  const [ outGoingTexts, setOutGoingTexts ] = useState<string[]>(
    [
      'Yo...', 
      "Hey man, how's you?",
      "Chillin, You mentioned a spot I could buy and sell clothes at..?", 
      "Yeah, Just swipe up from the bottom or click register!",
      'wazi!' ])

  return (
    <div className="encasing">
      
      {outGoingTexts.map((ogt, index)=>{
        return(
          <React.Fragment key={index}>
            <TextBubble  index={index} ogt={ogt}/>
          </React.Fragment>
        )})} 
    </div>
    
  )
}

export default OutgoingTexts