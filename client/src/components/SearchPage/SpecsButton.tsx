import { DarkModeColors, LightModeColors } from "@/colors";
import { Button, useColorModeValue } from "@chakra-ui/react";

export default function specsButton({
  icon,
  text,
}: {
  icon?: any;
  text: string;
}) {
  return (
    <Button
      variant={"solid"}
      size={"sm"}
      padding={2}
      borderRadius={"xl"}
      cursor={"default"}
      leftIcon={icon}
      bgColor={useColorModeValue(LightModeColors.specsBackground, "blue.800")}
      color={useColorModeValue(LightModeColors.text, DarkModeColors.text)}
    >
      {text}
    </Button>
  );
}
