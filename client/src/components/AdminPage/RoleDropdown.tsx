import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";

export default function RoleDropdown({
  role,
  onRoleChange,
}: {
  role: string;
  onRoleChange: (role: "ADMIN" | "USER") => void;
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        rightIcon={<ChevronDownIcon />}
        h="40px"
      >
        {role === "ADMIN" ? "Admin" : "User"}
      </MenuButton>
      <MenuList>
        <MenuItem h="40px" onClick={() => onRoleChange("USER")}>
          User
        </MenuItem>
        <MenuItem h="40px" onClick={() => onRoleChange("ADMIN")}>
          Admin
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
