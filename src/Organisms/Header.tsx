import { Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Navigation from "../Molecules/Navigation";

const Header = () => {
  return (
    <header>
      <Center>
        <Flex
          align="center"
          w={["100%", "1024px"]}
          px={["5", "10", "20", "0"]}
          py="20px"
        >
          <Heading as="h1" size={["sm", "md", "xl"]}>
            <Link href="/">大学受験カレンダー</Link>
          </Heading>
          <Spacer />
          <Navigation />
        </Flex>
      </Center>
    </header>
  );
};

export default Header;
