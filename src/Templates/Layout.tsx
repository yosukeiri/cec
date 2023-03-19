import Header from "../Organisms/Header";
import { Container, Flex } from "@chakra-ui/react";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Flex justify="center">
        <Container as="main" maxW="1024px" px="0" py="50px">
          {children}
        </Container>
      </Flex>
    </>
  );
};

export default Layout;
