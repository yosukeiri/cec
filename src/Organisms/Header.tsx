import { Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Navigation from "../Molecules/Navigation";

const Header = () => {
  return (
    <header>
      <Center>
        <Flex align="center" w="1024px" py="20px">
          <Heading as="h1" size="xl">
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
