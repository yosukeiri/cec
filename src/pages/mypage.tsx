import React from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import SchoolLine from "../Molecules/SchoolLine";
import Layout from "../Templates/Layout";
import Schedule from "../Molecules/Schedule";

const Mypage = () => {
  return (
    <Layout>
      <Heading as="h2" mb="10">
        <Text align="center">マイページ</Text>
      </Heading>
      <Box p="50px" bg="#AEFFBD" mb="10">
        <Heading as="h3" mb="5">
          入試予定校一覧
        </Heading>
        <Table variant="striped" colorScheme="linkedin">
          <Thead>
            <Tr>
              <Th>大学名</Th>
              <Th>出願締切</Th>
              <Th>入試日</Th>
              <Th>合格発表日</Th>
              <Th>入学締切日</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <SchoolLine />
            <SchoolLine />
            <SchoolLine />
            <SchoolLine />
            <SchoolLine />
          </Tbody>
        </Table>
      </Box>
      <Box p="50px" bg="#AEFFBD">
        <Heading as="h3" mb="5">
          入試スケジュール
        </Heading>
        <Schedule />
      </Box>
    </Layout>
  );
};

export default Mypage;
