import React from "react";
import { Box, HStack, Text, Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface TextBox {
  title: string;
  image: string;
  text: string;
}

const TopTextBox = (props: TextBox) => {
  return (
    <VStack as="dl" w="32%" spacing="5">
      <Heading as="dt">
        <Text fontSize="18px" align="center">
          {props.title}
        </Text>
      </Heading>
      <Box as="dd" position="relative" w="100%" h="250px">
        <Image
          src={props.image}
          fill
          alt={props.title}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Text as="dd">{props.text}</Text>
    </VStack>
  );
};

export default TopTextBox;
