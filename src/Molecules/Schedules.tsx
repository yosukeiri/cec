import React from "react";
import { Table, Text, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Schedule from "../Atoms/Schedule";
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

type PROPS = {
  schools: DATA[];
};

const Schedules = (props: PROPS) => {
  return (
    <>
      <Table
        style={{ overflow: "scroll", width: "100%", display: "block" }}
        mb="5"
        colorScheme="blackAlpha"
      >
        <Tbody className={style.tbody}>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">1/16</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/17</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/18</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/19</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/20</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={1} date={16} schools={props.schools} />

            <Schedule month={1} date={17} schools={props.schools} />

            <Schedule month={1} date={18} schools={props.schools} />

            <Schedule month={1} date={19} schools={props.schools} />

            <Schedule month={1} date={20} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">1/21</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/22</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/23</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/24</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/25</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={1} date={21} schools={props.schools} />
            <Schedule month={1} date={22} schools={props.schools} />
            <Schedule month={1} date={23} schools={props.schools} />
            <Schedule month={1} date={24} schools={props.schools} />
            <Schedule month={1} date={25} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">1/26</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/27</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/28</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/29</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">1/30</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={1} date={26} schools={props.schools} />
            <Schedule month={1} date={27} schools={props.schools} />
            <Schedule month={1} date={28} schools={props.schools} />
            <Schedule month={1} date={29} schools={props.schools} />
            <Schedule month={1} date={30} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">1/31</Text>
            </Th>
            <Th bg="#eee" w="20%"></Th>
            <Th bg="#eee" w="20%"></Th>
            <Th bg="#eee" w="20%"></Th>
            <Th bg="#eee" w="20%"></Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={1} date={31} schools={props.schools} />
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
          </Tr>
        </Tbody>
      </Table>
      <Table
        style={{ overflow: "scroll", width: "100%", display: "block" }}
        mb="5"
        colorScheme="blackAlpha"
      >
        <Tbody style={{ width: "923px", display: "block" }}>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/1</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/2</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/3</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/4</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/5</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={1} schools={props.schools} />
            <Schedule month={2} date={2} schools={props.schools} />
            <Schedule month={2} date={3} schools={props.schools} />
            <Schedule month={2} date={4} schools={props.schools} />
            <Schedule month={2} date={5} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/6</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/7</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/8</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/9</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/10</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={6} schools={props.schools} />
            <Schedule month={2} date={7} schools={props.schools} />
            <Schedule month={2} date={8} schools={props.schools} />
            <Schedule month={2} date={9} schools={props.schools} />
            <Schedule month={2} date={10} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/11</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/12</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/13</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/14</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/15</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={11} schools={props.schools} />
            <Schedule month={2} date={12} schools={props.schools} />
            <Schedule month={2} date={13} schools={props.schools} />
            <Schedule month={2} date={14} schools={props.schools} />
            <Schedule month={2} date={15} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/16</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/17</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/18</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/19</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/20</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={16} schools={props.schools} />
            <Schedule month={2} date={17} schools={props.schools} />
            <Schedule month={2} date={18} schools={props.schools} />
            <Schedule month={2} date={19} schools={props.schools} />
            <Schedule month={2} date={20} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/21</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/22</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/23</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/24</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/25</Text>
            </Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={21} schools={props.schools} />
            <Schedule month={2} date={22} schools={props.schools} />
            <Schedule month={2} date={23} schools={props.schools} />
            <Schedule month={2} date={24} schools={props.schools} />
            <Schedule month={2} date={25} schools={props.schools} />
          </Tr>
          <Tr className={style.tr}>
            <Th bg="#eee" w="20%">
              <Text align="center">2/26</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/27</Text>
            </Th>
            <Th bg="#eee" w="20%">
              <Text align="center">2/28</Text>
            </Th>
            <Th bg="#eee" w="20%"></Th>
            <Th bg="#eee" w="20%"></Th>
          </Tr>
          <Tr className={style.tr}>
            <Schedule month={2} date={26} schools={props.schools} />
            <Schedule month={2} date={27} schools={props.schools} />
            <Schedule month={2} date={28} schools={props.schools} />
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
            <Td bg="#fff" style={{ width: "20%", height: "80px" }}></Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default Schedules;
