import { useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const navHoverBg = {
    light: "gray.100",
    dark: "gray.700",
  };

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
      <Box>
        <NextLink href="/blog" passHref>
          <Button
            as="a"
            variant="ghost"
            p={[1, 2, 4]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
            backgroundColor={
              router.pathname.includes("/blog") ? navHoverBg[colorMode] : null
            }
            aria-label="Blog"
          >
            Blog
          </Button>
        </NextLink>
        <NextLink href="/projects" passHref>
          <Button
            as="a"
            variant="ghost"
            p={[1, 2, 4]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
            backgroundColor={
              router.pathname === "/projects" ? navHoverBg[colorMode] : null
            }
            aria-label="Projects"
          >
            Projects
          </Button>
        </NextLink>
        <NextLink href="/" passHref>
          <Button
            as="a"
            variant="ghost"
            p={[1, 2, 4]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
            backgroundColor={
              router.pathname === "/" ? navHoverBg[colorMode] : null
            }
            aria-label="Home"
          >
            Home
          </Button>
        </NextLink>
      </Box>
      <ThemeToggleButton />
    </Flex>
  );
};

export default Navbar;
