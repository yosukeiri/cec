import { useState, useEffect } from "react";
import Data from "../../data.json";
import { Text, Td } from "@chakra-ui/react";

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

type PROPS = {
  month: number;
  date: number;
  schools: DATA[];
};
const Schedule = (props: PROPS) => {
  const { month, date, schools } = props;
  const [matchSchools01, setMatchSchools01] = useState<DATA[]>([]);
  const [matchSchools02, setMatchSchools02] = useState<DATA[]>([]);
  const [matchSchools03, setMatchSchools03] = useState<DATA[]>([]);
  const [matchSchools04, setMatchSchools04] = useState<DATA[]>([]);

  useEffect(() => {
    // schoolsから申し込み期限でフィルター処理して大学名を抽出し、matchSchoole01にセット
    setMatchSchools01(
      schools.filter((item: DATA) => {
        return (
          new Date(item.applicationDeadline).getMonth() + 1 === month &&
          new Date(item.applicationDeadline).getDate() === date
        );
      })
    );
    // schoolsから入試日でフィルター処理して大学名を抽出し、matchSchoole02にセット
    setMatchSchools02(
      schools.filter((item: DATA) => {
        return (
          new Date(item.entranceExamDate).getMonth() + 1 === month &&
          new Date(item.entranceExamDate).getDate() === date
        );
      })
    );
    // schoolsから合格発表日でフィルター処理して大学名を抽出し、matchSchoole03にセット
    setMatchSchools03(
      schools.filter((item: DATA) => {
        return (
          new Date(item.announcementDate).getMonth() + 1 === month &&
          new Date(item.announcementDate).getDate() === date
        );
      })
    );
    // schoolsから入学金支払い期限でフィルター処理して大学名を抽出し、matchSchoole04にセット
    setMatchSchools04(
      schools.filter((item: DATA) => {
        return (
          new Date(item.paymentDeadline).getMonth() + 1 === month &&
          new Date(item.paymentDeadline).getDate() === date
        );
      })
    );
  }, [schools]);
  return (
    <Td bg="#fff" style={{ width: "20%", height: "80px" }}>
      {matchSchools01 &&
        matchSchools01.map((item: DATA) => {
          return (
            <Text key={item.id} align="center" fontSize="xs" color="red">
              {item.schoolName}出願締切
            </Text>
          );
        })}
      {matchSchools02 &&
        matchSchools02.map((item: DATA) => {
          return (
            <Text key={item.id} align="center" fontSize="xs" color="blue">
              {item.schoolName}入学試験
            </Text>
          );
        })}
      {matchSchools03 &&
        matchSchools03.map((item: DATA) => {
          return (
            <Text key={item.id} align="center" fontSize="xs" color="green">
              {item.schoolName}合格発表
            </Text>
          );
        })}
      {matchSchools04 &&
        matchSchools04.map((item: DATA) => {
          return (
            <Text key={item.id} align="center" fontSize="xs" color="pink">
              {item.schoolName}入学締切
            </Text>
          );
        })}
    </Td>
  );
};

export default Schedule;
