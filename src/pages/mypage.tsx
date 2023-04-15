import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import SchoolLine from "../Molecules/SchoolLine";
import Layout from "../Templates/Layout";
import Schedules from "../Molecules/Schedules";
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Data from "../../data.json";
import { useAuthContext } from "../context/AuthContext";
import style from "../../styles/style.module.css";

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

export type ApplyFor = {
  applyFor: number[];
};

const Mypage = () => {
  const { user } = useAuthContext();
  const [schools, setSchools] = useState<DATA[]>([]);
  const [refDoc, setRefDoc] = useState<DocumentReference<DocumentData>>();
  const [data, setData] = useState<DATA[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // useAuthContextからuserがセットされ次第、DataとrefDocをセット
  useEffect(() => {
    if (user) {
      setData(Data);
      setRefDoc(doc(db, "userSchool", user.uid));
    }
  }, [user]);

  // isEditが更新され次第、DataとrefDocを再度セット
  useEffect(() => {
    if (user) {
      setData(Data);
      setRefDoc(doc(db, "userSchool", user.uid));
    }
  }, [isEdit]);

  // refDocが更新され次第、登録済みの大学を抽出そschoolsにセット
  useEffect(() => {
    const getApplyFor = async (refDoc: DocumentReference<DocumentData>) => {
      const registered_items = (await getDoc(
        refDoc
      )) as DocumentSnapshot<ApplyFor>;
      const registered_schools = data.filter((item) => {
        const registeredItem = registered_items.data();
        if (registeredItem === undefined) return;
        return registeredItem.applyFor.includes(item.id);
      });
      setSchools(registered_schools);
    };
    if (refDoc) {
      getApplyFor(refDoc);
    }
  }, [refDoc]);

  return (
    <Layout>
      <Heading as="h2" mb={["5", "10"]} size={["md", "xl"]}>
        <Text align="center">{user?.displayName}さんのマイページ</Text>
      </Heading>
      <Box p={["30px 20px", "50px"]} bg="#AEFFBD" mb="10">
        <Heading as="h3" mb="5" fontSize={["md", "xl"]}>
          入試予定校一覧
        </Heading>
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
      <Box p={["30px 20px", "50px"]} bg="#AEFFBD">
        <Heading as="h3" mb="5" fontSize={["md", "xl"]}>
          入試スケジュール
        </Heading>
        <Schedules schools={schools} />
      </Box>
    </Layout>
  );
};

export default Mypage;
