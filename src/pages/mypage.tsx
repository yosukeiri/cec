import { useState, useEffect, useRef } from "react";
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Data from "../../data.json";
import { useAuthContext } from "../context/AuthContext";

type DATA = typeof Data;

const Mypage = () => {
  const { user } = useAuthContext();
  const ref = useRef(true);

  const [schools, setSchools] = useState([]);
  const [refDoc, setRefDoc] = useState<any>();
  const [data, setData] = useState<DATA>([]);

  // useEffect(() => {
  //   // 初回レンダリング時はrefをfalseにして、return。
  //   if (ref.current) {
  //     ref.current = false;
  //     return;
  //   }
  //   setData(Data);
  //   setRefDoc(doc(db, "userSchool", user.uid));
  // }, [user]);

  // useEffect(() => {
  //   const f = async () => {
  //     const registered_items = await getDoc(refDoc.data().applyFor);
  //     const registered_schools = data.filter((item) => {
  //       return registered_items.includes(item.id);
  //     });

  //     setSchools(registered_schools);
  //   };
  //   f();
  // }, [refDoc]);

  return (
    <Layout>
      <Heading as="h2" mb={["5", "10"]} size={["md", "xl"]}>
        <Text align="center">マイページ</Text>
      </Heading>
      <Box p={["30px 20px", "50px"]} bg="#AEFFBD" mb="10">
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
            {schools &&
              schools.map((item: DATA) => {
                return <SchoolLine key={item.id} school={item} />;
              })}
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
