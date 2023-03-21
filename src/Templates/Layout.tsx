import Header from "../Organisms/Header";
import { Container, Flex } from "@chakra-ui/react";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Flex justify="center">
        <Container
          as="main"
          maxW={["100%", "1024px"]}
          px={["5", "10", "20", "0"]}
          py={["10px", "50px"]}
        >
          {children}
        </Container>
      </Flex>
    </>
  );
};

export default Layout;
