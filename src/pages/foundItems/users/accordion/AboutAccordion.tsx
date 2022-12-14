import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    createTheme,
    ThemeProvider,
    Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as typing from "../../../../types/appTypes"


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
            minHeight: "30px"
          },
        },
      },
      MuiAccordionDetails:{
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              paddingTop: 0, 
              paddingBottom:8
            },
          },
      }
    },
  });

const AboutAccordion: React.FC<typing.theUser> = ({user}) => {
  return (
    <div>
        <ThemeProvider theme={theme}>
            <Accordion 
                disableGutters={true}
                elevation={0}
                sx={{
                    mt:1,
                    
                    }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography 
                        variant="subtitle2"
                        sx={{ml: "auto", mr:"auto", mt:0, mb:0, boxSizing:"border-box"}}
                        >{ "About" }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="caption" sx={{ml: "auto", mr:"auto"}}>
                        { user!?.bio }
                    </Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Stack>
                        <Typography variant="subtitle2" sx={{ml: "auto", mr:"auto"}}>
                            {"Contact:"}
                        </Typography>
                        <Typography variant="body2" sx={{ml: "auto", mr:"auto"}}>
                            { user!?.email }
                        </Typography>
                        <Typography variant="caption" sx={{ml: "auto", mr:"auto"}}>
                            { user!?.telephone }
                        </Typography>
                    </Stack>
                </AccordionDetails>
                <AccordionDetails>
                    <Stack>
                        <Typography variant="subtitle2" sx={{ml: "auto", mr:"auto"}}>
                            {"Location:"}
                        </Typography>
                        <Typography variant="body2" sx={{ml: "auto", mr:"auto"}}>
                            { user!?.location ? user.location : "Location not registered." }
                        </Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    </div>
  )
}

export default AboutAccordion