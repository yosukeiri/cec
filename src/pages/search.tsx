import React, { useState, useEffect } from "react";
import Layout from "../Templates/Layout";
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
import SearchArea from "../Organisms/SearchArea";
import style from "../../styles/style.module.css";
import { useAuthContext } from "../context/AuthContext";
import Data from "../../data.json";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

type DATA = {
  id: number;
  schoolName: string;
  applicationDeadline: string;
  entranceExamDate: string;
  announcementDate: string;
  paymentDeadline: string;
  area: string;
  subjects: {
    s01: boolean;
    s02: boolean;
    s03: boolean;
    s04: boolean;
    s05: boolean;
  };
  image: string;
  title: string;
  text: string;
};

const Search = () => {
  const { user } = useAuthContext();
  const [schools, setSchools] = useState<DATA[]>([]);
  const [refDoc, setRefDoc] = useState<
    DocumentReference<DocumentData> | undefined
  >(undefined);
  const [data, setData] = useState<DATA[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    // 初回ユーザー認証後にjsonデータからデータ取得
    if (user) {
      setData(Data);
      setRefDoc(doc(db, "userSchool", user.uid));
    }
  }, [user]);
  useEffect(() => {
    // 編集後にjsonデータからデータ取得
    if (user) {
      setData(Data);
      setRefDoc(doc(db, "userSchool", user.uid));
    }
  }, [isEdit]);

  return (
    <Layout>
      <Heading as="h2" mb={["5", "10"]} fontSize={["md", "xl"]}>
        <Text align="center">学校検索</Text>
      </Heading>
      <SearchArea setSchools={setSchools} />
      <Box p={["30px 20px", "50px"]} bg="#AEFFBD">
        <HStack spacing="5" mb="5">
          <Heading as="h3" fontSize={["md", "xl"]}>
            検索結果
          </Heading>
          <Text fontSize={["md", "xl"]}>{schools.length}件</Text>
        </HStack>
        <Table
          variant="striped"
          colorScheme="linkedin"
          style={{ overflow: "scroll", width: "100%", display: "block" }}
        >
          <Thead style={{ width: "923px", display: "block" }}>
            <Tr className={style.tr}>
              <Th style={{ width: "16%" }}>大学名</Th>
              <Th style={{ width: "10%" }}>
                <Text align="center">都道府県</Text>
              </Th>
              <Th style={{ width: "10%" }}>
                <Text align="center">出願締切</Text>
              </Th>
              <Th style={{ width: "10%" }}>
                <Text align="center">入試日</Text>
              </Th>
              <Th style={{ width: "10%" }}>
                <Text align="center">合格発表</Text>
              </Th>
              <Th style={{ width: "10%" }}>
                <Text align="center">入学締切</Text>
              </Th>
              <Th style={{ width: "12%" }}></Th>
              <Th style={{ width: "12%" }}></Th>
            </Tr>
          </Thead>
          <Tbody style={{ width: "923px", display: "block" }}>
            {schools &&
              schools.map((item: DATA) => {
                return (
                  <SchoolLine
                    key={item.id}
                    school={item}
                    schools={schools}
                    setIsEdit={setIsEdit}
                    refDoc={refDoc}
                    setRefDoc={setRefDoc}
                  />
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
};

export default Search;
