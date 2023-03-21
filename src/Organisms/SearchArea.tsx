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

type DATA = typeof Data;
type FormDataSearch = {
  freeText: string;
  area: any;
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

const SearchArea = (props: any) => {
  const [data, setData] = useState<DATA>([]);
  const { register, handleSubmit, reset, control } = useForm<FormDataSearch>({
    defaultValues: {
      area: [],
    },
  });

  useEffect(() => {
    setData(Data);
  }, []);

  const onSubmitSearch: SubmitHandler<FormDataSearch> = async (condition) => {
    try {
      let result: DATA = [...data];
      if (condition.freeText) {
        result = result.filter((item: any) => {
          return item.schoolName.includes(condition.freeText);
        });
      }
      if (condition.area.length > 0) {
        result = result.filter((item: any) => {
          return condition.area.includes(item.area);
        });
      }
      if (condition.applicationTermEnd) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.applicationTermEnd).getTime() >=
            new Date(item.applicationDeadline).getTime()
          );
        });
      }
      if (condition.ExamTermStart) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.ExamTermStart).getTime() <=
            new Date(item.entranceExamDate).getTime()
          );
        });
      }
      if (condition.ExamTermEnd) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.ExamTermEnd).getTime() >=
            new Date(item.entranceExamDate).getTime()
          );
        });
      }
      if (condition.announcementTermStart) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.announcementTermStart).getTime() <=
            new Date(item.announcementDate).getTime()
          );
        });
      }
      if (condition.announcementTermEnd) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.announcementTermEnd).getTime() >=
            new Date(item.announcementDate).getTime()
          );
        });
      }
      if (condition.paymentTermStart) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.paymentTermStart).getTime() <=
            new Date(item.paymentDeadline).getTime()
          );
        });
      }
      if (condition.paymentTermEnd) {
        result = result.filter((item: any) => {
          return (
            new Date(condition.paymentTermEnd).getTime() >=
            new Date(item.paymentDeadline).getTime()
          );
        });
      }
      props.setSchools(result);
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      alert(e);
    }
    reset();
  };
  return (
    <Box bg="#AEFFBD" p="50px" mb="10">
      <form onSubmit={handleSubmit(onSubmitSearch)}>
        <Stack spacing={10} mb={20}>
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
              {/* <HStack as="dd" wrap="wrap">
                {areaList.map((item: string, index: any) => {
                  return (
                    <Flex key={index} w="14.2%" align="center" pb="5">
                      <Checkbox
                        id={index + 1}
                        value={item}
                        bg="#fff"
                        mr="3"
                        {...register("area")}
                      />
                      <label htmlFor={item}>{item}</label>
                    </Flex>
                  );
                })}
              </HStack> */}
              <Controller
                name="area"
                control={control}
                render={({ field }) => {
                  return (
                    <CheckboxGroup {...field}>
                      {areaList.map((item: string, index: any) => {
                        return (
                          <label htmlFor={item} key={index}>
                            {item}
                            <Checkbox
                              id={index + 1}
                              value={item}
                              bg="#fff"
                              mr="3"
                              {...register("area")}
                            />
                          </label>
                        );
                      })}
                    </CheckboxGroup>
                  );
                }}
              />
            </dl>
          </Box>
          <HStack justify="space-between">
            <Box w="48%">
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
            <Box w="48%">
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
          </HStack>
          <HStack justify="space-between">
            <Box w="48%">
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
            <Box w="48%">
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
          </HStack>
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
