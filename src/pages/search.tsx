import React, { useState, useEffect } from "react";
import Layout from "../Templates/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Heading,
  Input,
  Checkbox,
  Button,
  Center,
  Text,
  Stack,
  Flex,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import SchoolLine from "../Molecules/SchoolLine";
import { Pagination } from "../Molecules/Pagination";
import SearchArea from "../Organisms/SearchArea";
import Data from "../../data.json";

type DATA = typeof Data;

const Search = () => {
  const postPerPage = 6;
  const [schools, setSchools] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagedResult, setPagedResult] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useEffect(() => {
    setTotalCount(searchResult.length);
    setPagedResult(searchResult.slice(0, postPerPage));
  }, [searchResult]);

  useEffect(() => {
    const startTodo = (currentPage - 1) * postPerPage;
    const endTodo = (currentPage - 1) * postPerPage + postPerPage;
    setPagedResult(searchResult.slice(startTodo, endTodo));
  }, [currentPage]);

  return (
    <Layout>
      <Heading as="h2" mb="10">
        <Text align="center">学校検索</Text>
      </Heading>
      <SearchArea setSchools={setSchools} />
      <Box p="50px" bg="#AEFFBD">
        <HStack spacing="5" mb="5">
          <Heading as="h3">検索結果</Heading>
          <Text fontSize="3xl">{schools.length}件</Text>
        </HStack>
        <Table variant="striped" colorScheme="telegram">
          <Thead>
            <Tr>
              <Th>大学名</Th>
              <Th>
                <Text align="center">都道府県</Text>
              </Th>
              <Th>
                <Text align="center">出願締切</Text>
              </Th>
              <Th>
                <Text align="center">入試日</Text>
              </Th>
              <Th>
                <Text align="center">合格発表日</Text>
              </Th>
              <Th>
                <Text align="center">入学締切日</Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {schools &&
              schools.map((item: DATA) => {
                return <SchoolLine key={item.id} school={item} />;
              })}
          </Tbody>
        </Table>
        <Pagination
          totalCount={totalCount}
          PER_PAGE={postPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Layout>
  );
};

export default Search;
