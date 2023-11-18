import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { Box, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

export function LeverageSlider({ sliderValue = 2, setSliderValue }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const labelStyles = {
    mt: "2",
    ml: "-2",
    fontSize: "xs",
    fontWeight: "semibold",
  };

  const marks = [...Array(11).keys()].map((i) => {
    return {
      value: i * 5,
      label: `${i * 5}x`,
    };
  });
  marks[0].label = "1x";
  marks[0].value = 1;

  return (
    <Box pt={6} pb={2} className="text-white/40">
      <Slider
        aria-label="slider-leverage"
        onChange={(val) => setSliderValue(val)}
        defaultValue={sliderValue}
        value={sliderValue}
        min={1.1}
        max={50}
        step={0.1}
        colorScheme="teal"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {marks.map(({ value, label }) => {
          return (
            <SliderMark key={value} value={value} {...labelStyles}>
              {label}
            </SliderMark>
          );
        })}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}x`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
}
