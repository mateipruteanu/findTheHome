import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CustomSlider({
  minValue,
  maxValue,
  defaultValues,
  step,
  onChangeEnd,
}: {
  minValue: number;
  maxValue: number;
  defaultValues: number[];
  step: number;
  onChangeEnd: (val: number[]) => void;
}) {
  const [leftSliderValue, setLeftSliderValue] = useState(minValue);
  const [rightSliderValue, setRightSliderValue] = useState(maxValue);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <RangeSlider
      aria-label={["min", "max"]}
      defaultValue={defaultValues}
      min={minValue}
      max={maxValue}
      step={step}
      onChange={(val) => {
        setLeftSliderValue(val[0]);
        setRightSliderValue(val[1]);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onChangeEnd={(val) => {
        onChangeEnd(val);
      }}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${leftSliderValue}`}
      >
        <RangeSliderThumb index={0} />
      </Tooltip>

      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${rightSliderValue}`}
      >
        <RangeSliderThumb index={1} />
      </Tooltip>
    </RangeSlider>
  );
}
