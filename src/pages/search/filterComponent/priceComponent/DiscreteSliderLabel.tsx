import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Input, Stack } from '@mui/material';
import * as typing from "../../../../types/appTypes"

const marks = [
  {
    value: 0,
    label: 'kes0',
  },
  {
    value: 1000000,
    label: 'kes1m',
  }
];

function valuetext(value: number) {
  return `kes${value}`;
}



const DiscreteSliderLabel: React.FC<typing.ForExploreSlider> = ({price, setPrice})=> {


    const handleChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value === undefined ? undefined : Number(event.target.value) as number);
    };
    const handleBlur = () => {
        if (price! < 0) {
          setPrice(0);
        } else if (price! > 100) {
          setPrice(100);
        }
      };

  return (
    <Box sx={{ width: 300, ml:"auto", mr: "auto", display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
        <Stack>
            <Slider
                sx={{width: "210px"}}
                aria-label="Always visible"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={1000}
                min={0}
                max={1000000}
                marks={marks}
                valueLabelDisplay="auto"
                value={price}
                onChange={handleChange}
            />
        </Stack>
        <Stack>
        <Input
            sx={{
                borderRadius: "5px",
                backgroundColor: "white",
                p: 0.5,
                boxSizing: "border-box",
                width: "60px"
            }}
            defaultValue={price}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Stack>
    </Box>
  );
}

export default DiscreteSliderLabel