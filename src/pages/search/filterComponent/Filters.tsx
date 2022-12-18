import React, { useEffect, useState } from 'react';
import {
  Chip, 
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  createTheme,
  ThemeProvider,
  Box,
  Button,
 } from '@mui/material';
 import { ExpandMore, Done } from '@mui/icons-material';
 import DiscreteSliderLabel from './priceComponent/DiscreteSliderLabel'
 import { useAppContext } from "../../../context/appContext"
import './Filters.css'


const theme = createTheme({
  components: {
    // Name of the component
    MuiAccordionSummary: {
      styleOverrides: {
        // Name of the slot
        content: {
          // Some CSS
          margin: '0px',
        },
        root: {
          // Some CSS
          maxHeight: '30px',
          minHeight: "30px",
          backgroundColor: "#f7f7f7",
          width: "375px",
        },
      },
    },
    MuiAccordionDetails:{
      styleOverrides: {
          root: {
            paddingTop: 0, 
            paddingBottom:8,
            backgroundColor: "#f7f7f7"
          },
        },
    }
  },
});


const Filters = () => {

  const { filterProdsB} = useAppContext()

  let categories = ['outerwear', 'suits and blazers', 'trousers', 'leggings', 'socks', 'underwear','activewear', 'jeans', 'baby clothes', 'tops and tshirts', 'maternity clothes', 'jumpers and sweatshirts',  'cropped pants', 'shorts', 'swimwear', 'costumes and special outfits', 'dresses', 'jumpsuits and rompers', 'lingerie', 'nightwear', 'skirts', 'pajamas'];
  categories = categories.sort((a, b)=>{
    if (a.length> b.length) return 1
    if (b.length> a.length) return -1
    return 0
  })

  let sexes = [ {label:"him", value: "Male"}, {label:"her", value: "Female"}, {label:"unisex", value: "Unisex"}]

  const [ selectedChip, setSelectedChip ] = useState<string[]>([])
  const [ gender, setGender ] = useState<Object[]>([])
  const [price, setPrice] = React.useState<number | undefined>(0);

  

  useEffect(() => {
    filterProdsB(gender, selectedChip, price)
  },[price])


  const handleChipSelection = (cat: string)=>{
    if(selectedChip.indexOf(cat)!== -1){
      let newCat = selectedChip.filter(chip=> chip !== cat)
      setSelectedChip(newCat)
      filterProdsB(gender, newCat, price)
    }else{
      let newCat = [...selectedChip, cat]
      setSelectedChip(newCat)
      filterProdsB(gender, newCat, price)
    }
  }

  const handleGenderSelection = (sex: string)=>{
    if(gender.indexOf(sex)!== -1){
      let newGen = gender.filter(pronoun => pronoun !== sex)
      setGender(newGen)
      filterProdsB(newGen, selectedChip, price)

    }else{
      let newGen = [...gender, sex]
      setGender(newGen)
      filterProdsB(newGen, selectedChip, price)
    }
  }

  return (
    <>
      <Stack className="pickSex" sx={{ 
        mt: 4, 
        width:"390px", 
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContext:"space-between",
        backgroundColor: "#f7f7f7",
        boxSizing:"border-box",
        borderRadius: "10px",
        p:1,
        filter:"drop-shadow(0 1px 0px rgba(1, 81, 161, 0.5))"
      }}>
        <Typography variant="subtitle2"
          sx={{
            pl: 2
          }}
        >
            {"For who?"}
        </Typography>
        <Box sx={{ 
          ml: "auto",
          mr:2,
          display:"flex",
          direction:"row",
          flexWrap:"nowrap"
        }}>
          {sexes.map((sex, index) =>{
            return(
              <Button 
                key={index}
                onClick={()=>handleGenderSelection(sex.value)}
                variant={gender.some(gen=>sex.value === gen) ? "contained" : undefined}
                >{sex.label}</Button>
              )
          })}
        </Box>
      </Stack>
      <Stack className="pickCategory" 
        sx={{
          mt: 2, 
          width:"390px", 
          display:"flex",
          flexDirection:"row",
          flexWrap: "wrap",
          backgroundColor: "#f7f7f7",
          boxSizing:"border-box",
          borderRadius: "10px",
          p:1,
          filter:"drop-shadow(0 1px 0px rgba(1, 81, 161, 0.5))"
        }}
      >
        <ThemeProvider theme={theme}>
          <Accordion 
            disableGutters={true}
            elevation={0}
            sx={{
              // mt:1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography 
                variant="subtitle2"
                sx={{ mr:"auto", mt:0, mb:0, boxSizing:"border-box"}}
              >
                { "Pick a category" }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categories.map((cat, index)=>{
                return (
                  <Chip 
                    size={"medium"} 
                    key={index} 
                    label={cat} 
                    color="default" 
                    onClick={()=>handleChipSelection(cat)}
                    variant="filled" 
                    icon = {selectedChip.indexOf(cat)=== -1 ? undefined : <Done color={"success"} fontSize={"small"}/>}
                    sx={{
                      m:0.3,
                      color: "#048",
                      boxSizing: "border-box"
                      // backgroundColor: "white"
                    }}
                />)
              })}
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </Stack>  
      <Stack className="setPrice" sx={{ 
        mt: 2, 
        width:"390px", 
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContext:"space-between",
        backgroundColor: "#f7f7f7",
        boxSizing:"border-box",
        borderRadius: "10px",
        p:1,
        filter:"drop-shadow(0 1px 0px rgba(1, 81, 161, 0.5))"
      }}>
        <ThemeProvider theme={theme}>
          <Accordion 
            disableGutters={true}
            elevation={0}
            sx={{
              // mt:1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ml: "auto"}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography 
                variant="subtitle2"
                sx={{ mr:"auto", mt:0, mb:0, boxSizing:"border-box"}}
              >
                {"Max price:"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DiscreteSliderLabel setPrice={setPrice} price={price}/>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </Stack>
    </>
  )
}

export default Filters