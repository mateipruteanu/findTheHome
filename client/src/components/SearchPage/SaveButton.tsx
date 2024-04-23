import { LightModeColors, DarkModeColors } from "@/colors";
import { useColorModeValue } from "@chakra-ui/react";
import { IconBookmarkFilled, IconBookmark } from "@tabler/icons-react";

export default function SaveButton({
  isListingSaved,
}: {
  isListingSaved: boolean;
}) {
  if (isListingSaved) {
    return (
      <IconBookmarkFilled
        color={useColorModeValue(LightModeColors.text, DarkModeColors.text)}
      />
    );
  } else {
    return (
      <IconBookmark
        color={useColorModeValue(LightModeColors.text, DarkModeColors.text)}
      />
    );
  }
}
