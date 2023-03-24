import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Input,
  Checkbox,
  Button,
  Center,
  Text,
  Stack,
  Flex,
  HStack,
  CheckboxGroup,
} from "@chakra-ui/react";
import Data from "../../data.json";

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
type FormDataSearch = {
  freeText: string;
  area: string[];
  applicationTermEnd: string;
  ExamTermStart: string;
  ExamTermEnd: string;
  announcementTermStart: string;
  announcementTermEnd: string;
  paymentTermStart: string;
  paymentTermEnd: string;
};

const areaList = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

type PROPS = {
  setSchools: any;
};

const SearchArea = (props: PROPS) => {
  const [data, setData] = useState<DATA[]>([]);
  const { register, handleSubmit, reset, control } = useForm<FormDataSearch>({
    defaultValues: {
      area: [],
    },
  });

  //初回レンダリングにてjsonからデータを抽出
  useEffect(() => {
    console.log("SearchArea：", "初回");
    setData(Data);
  }, []);

  //検索ボタンをクリック時、フォームの検索条件をもとに検索結果をschoolに代入
  const onSubmitSearch: SubmitHandler<FormDataSearch> = async (condition) => {
    try {
      let result: DATA[] = [...data];

      //自由入力欄の文字列を含有する大学名をもつschoolをresultに代入
      if (condition.freeText) {
        result = result.filter((item: DATA) => {
          return item.schoolName.includes(condition.freeText);
        });
      }

      //チェックされた都道府県を含有するschoolをresultに代入
      if (condition.area.length > 0) {
        result = result.filter((item: DATA) => {
          return condition.area.includes(item.area);
        });
      }

      //入力した出願日時以降の出願日時をもつschoolをresultに代入
      if (condition.applicationTermEnd) {
        result = result.filter((item: DATA) => {
          return (
            new Date(condition.applicationTermEnd).getTime() >=
            new Date(item.applicationDeadline).getTime()
          );
        });
      }

      //入力した試験日時以降の試験日時をもつschoolをresultに代入
      if (condition.ExamTermStart) {
        result = result.filter((item: DATA) => {
          const targetTime = new Date(condition.ExamTermStart);
          targetTime.setHours(0);
          return (
            targetTime.getTime() <= new Date(item.entranceExamDate).getTime()
          );
        });
      }

      //入力した試験日時以前の試験日時をもつschoolをresultに代入
      if (condition.ExamTermEnd) {
        result = result.filter((item: DATA) => {
          return (
            new Date(condition.ExamTermEnd).getTime() >=
            new Date(item.entranceExamDate).getTime()
          );
        });
      }

      //入力した発表日時以降の発表日時をもつschoolをresultに代入
      if (condition.announcementTermStart) {
        result = result.filter((item: DATA) => {
          const targetTime = new Date(condition.announcementTermStart);
          targetTime.setHours(0);
          return (
            targetTime.getTime() <= new Date(item.announcementDate).getTime()
          );
        });
      }

      //入力した発表日時以前の発表日時をもつschoolをresultに代入
      if (condition.announcementTermEnd) {
        result = result.filter((item: DATA) => {
          return (
            new Date(condition.announcementTermEnd).getTime() >=
            new Date(item.announcementDate).getTime()
          );
        });
      }

      //入力した入学締切以降の入学締切をもつschoolをresultに代入
      if (condition.paymentTermStart) {
        result = result.filter((item: DATA) => {
          const targetTime = new Date(condition.paymentTermStart);
          targetTime.setHours(0);
          return (
            targetTime.getTime() <= new Date(item.paymentDeadline).getTime()
          );
        });
      }

      //入力した入学締切以前の入学締切をもつschoolをresultに代入
      if (condition.paymentTermEnd) {
        result = result.filter((item: DATA) => {
          return (
            new Date(condition.paymentTermEnd).getTime() >=
            new Date(item.paymentDeadline).getTime()
          );
        });
      }

      //検索結果によって代入されたresultをschoolsにset
      props.setSchools(result);
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      alert(e);
    }
    //検索条件をリセットする
    reset();
  };
  return (
    <Box bg="#AEFFBD" p={["30px 20px", "50px"]} mb="10">
      <form onSubmit={handleSubmit(onSubmitSearch)}>
        <Stack spacing={["5", "10"]} mb={20}>
          <Box>
            <dl>
              <dt>自由検索</dt>
              <dd>
                <Input
                  bg="#fff"
                  p="10px"
                  w="100%"
                  placeholder="○○大学"
                  {...register("freeText")}
                />
              </dd>
            </dl>
          </Box>
          <Box>
            <dl>
              <dt>エリア</dt>
              <Controller
                name="area"
                control={control}
                render={({ field: { ref, value, onChange } }) => {
                  return (
                    <CheckboxGroup value={value} onChange={onChange}>
                      <HStack as="dd" wrap="wrap">
                        {areaList.map((item: string, index: number) => {
                          return (
                            <Flex
                              as="label"
                              align="center"
                              w={["33%", "14.2%"]}
                              pb="5"
                              htmlFor={item}
                              key={index}
                            >
                              <Checkbox
                                id={item}
                                value={item}
                                bg="#fff"
                                mr="3"
                                ref={ref}
                              />
                              {item}
                            </Flex>
                          );
                        })}
                      </HStack>
                    </CheckboxGroup>
                  );
                }}
              />
            </dl>
          </Box>
          <Flex justify="space-between" wrap="wrap">
            <Box w={["100%", "48%"]} mb={["5", "0"]}>
              <dl>
                <dt>出願締切</dt>
                <HStack as="dd" justify="space-between">
                  <Text>〜</Text>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="93%"
                    {...register("applicationTermEnd")}
                    type={"date"}
                  />
                </HStack>
              </dl>
            </Box>
            <Box w={["100%", "48%"]} mb={["5", "0"]}>
              <dl>
                <dt>入試日</dt>
                <HStack as="dd" justify="space-between">
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("ExamTermStart")}
                    type={"date"}
                  />
                  <Text>〜</Text>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("ExamTermEnd")}
                    type={"date"}
                  />
                </HStack>
              </dl>
            </Box>
          </Flex>
          <Flex justify="space-between" wrap="wrap">
            <Box w={["100%", "48%"]} mb={["5", "0"]}>
              <dl>
                <dt>合格発表日</dt>
                <HStack as="dd" justify="space-between">
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("announcementTermStart")}
                    type={"date"}
                  />
                  <Text>〜</Text>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("announcementTermEnd")}
                    type={"date"}
                  />
                </HStack>
              </dl>
            </Box>
            <Box w={["100%", "48%"]} mb={["5", "0"]}>
              <dl>
                <dt>入学締切日</dt>
                <HStack as="dd" justify="space-between">
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("paymentTermStart")}
                    type={"date"}
                  />
                  <Text>〜</Text>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="43%"
                    {...register("paymentTermEnd")}
                    type={"date"}
                  />
                </HStack>
              </dl>
            </Box>
          </Flex>
        </Stack>
        <Center>
          <Button
            bg={"#28ADCA"}
            rounded={50}
            w={"204px"}
            h={"54px"}
            color={"#F0FCFF"}
            fontSize="24px"
            type="submit"
          >
            検索
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default SearchArea;
