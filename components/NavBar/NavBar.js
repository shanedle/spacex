import { Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      as="nav"
      my={8}
      mx="auto"
    >
      <Logo />
      <ThemeToggleButton />
    </Flex>
  );
};

export default Navbar;
