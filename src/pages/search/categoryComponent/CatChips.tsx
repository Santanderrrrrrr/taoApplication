import * as React from 'react';
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
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './catChips.css'


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
          backgroundColor: "#f7f7f7"
        },
      },
    },
    MuiAccordionDetails:{
      styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            paddingTop: 0, 
            paddingBottom:8,
            backgroundColor: "#f7f7f7"
          },
        },
    }
  },
});


const CatChips = () => {

    let categories = ['outerwear', 'suits and blazers', 'tousers', 'leggings', 'socks', 'underwear','activewear', 'jeans', 'baby clothes', 'tops and tshirts', 'maternity clothes', 'jumpers and sweatshirts',  'cropped pants', 'shorts', 'swimwear', 'costumes and special outfits', 'dresses', 'jumpsuits and rompers', 'lingerie', 'nightwear', 'skirts', 'pajamas'];
    categories = categories.sort((a, b)=>{
      if (a.length> b.length) return 1
      if (b.length> a.length) return -1
      return 0
    })

    let sexes = [ "him", "her", "unisex"]
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
        p:1
      }}>
        <Typography variant="subtitle1"
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
            return <Button key={index}>{sex}</Button>
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
          p:1
        }}
      >
        <ThemeProvider theme={theme}>
          <Accordion 
            disableGutters={true}
            elevation={0}
            sx={{
              mt:1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography 
                variant="subtitle1"
                sx={{ mr:"auto", mt:0, mb:0, boxSizing:"border-box"}}
              >
                { "Pick a category" }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categories.map((cat, index)=>{
                return <Chip size={"medium"} key={index} label={cat} color="default" variant="filled" 
                sx={{
                  m:0.3,
                  color: "#048",
                  // backgroundColor: "white"
                }}
                />
              })}
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </Stack>  
    </>
  )
}

export default CatChips