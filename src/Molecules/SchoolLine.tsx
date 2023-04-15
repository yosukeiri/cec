import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Button,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import Data from "../../data.json";
import Image from "next/image";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  DocumentSnapshot,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { ApplyFor } from "../pages/mypage";

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
  school: DATA;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  refDoc?: DocumentReference<DocumentData>;
  setRefDoc: Dispatch<
    SetStateAction<DocumentReference<DocumentData> | undefined>
  >;
};

const SchoolLine = (props: PROPS) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const [registered, setRegistered] = useState<boolean | null>(false);
  const date01 = new Date(props.school.applicationDeadline);
  const date02 = new Date(props.school.entranceExamDate);
  const date03 = new Date(props.school.announcementDate);
  const date04 = new Date(props.school.paymentDeadline);

  const refDoc = props.refDoc;

  useEffect(() => {
    // fireabeseからデータ取得し、schollのidと合致する場合registerをtrueに
    const f = async () => {
      if (refDoc) {
        const registeredData = (await getDoc(
          refDoc
        )) as DocumentSnapshot<ApplyFor>;
        const registeredItem = registeredData.data();
        if (!registeredItem) return;
        setRegistered(registeredItem.applyFor.includes(props.school.id));
      }
    };
    f();
  }, [refDoc, user]);

  // 登録ボタンによってfirebaseのuserSchoolに登録
  const schoolRegister = async () => {
    if (!refDoc) return;
    try {
      await updateDoc(refDoc, {
        applyFor: arrayUnion(props.school.id),
      }).then(() => {
        if (user) {
          props.setRefDoc(doc(db, "userSchool", user.uid));
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  // 削除ボタンによってfirebaseのuserSchoolから削除
  const schoolRemove = async () => {
    if (!refDoc) return;
    try {
      await updateDoc(refDoc, {
        applyFor: arrayRemove(props.school.id),
      }).then(() => {
        if (user) {
          props.setRefDoc(doc(db, "userSchool", user.uid));
          props.setIsEdit(true);
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <Tr>
        <Td style={{ width: "16%" }}>{props.school.schoolName}</Td>
        <Td style={{ width: "10%" }}>
          <Text align="center">{props.school.area}</Text>
        </Td>
        <Td style={{ width: "10%" }}>
          <Text align="center">
            {date01.getMonth() + 1}/{date01.getDate()}
          </Text>
        </Td>
        <Td style={{ width: "10%" }}>
          <Text align="center">
            {date02.getMonth() + 1}/{date02.getDate()}
          </Text>
        </Td>
        <Td style={{ width: "10%" }}>
          <Text align="center">
            {date03.getMonth() + 1}/{date03.getDate()}
          </Text>
        </Td>
        <Td style={{ width: "10%" }}>
          <Text align="center">
            {date04.getMonth() + 1}/{date04.getDate()}
          </Text>
        </Td>
        <Td style={{ width: "12%" }}>
          <Button colorScheme="blue" onClick={onOpen}>
            詳細
          </Button>
        </Td>
        <Td style={{ width: "12%" }}>
          {registered ? (
            <Button colorScheme="orange" onClick={schoolRemove}>
              削除
            </Button>
          ) : (
            <Button colorScheme="green" onClick={schoolRegister}>
              登録
            </Button>
          )}
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.school.schoolName}</ModalHeader>
          <Box style={{ position: "relative", width: "100%", height: "300px" }}>
            <Image
              src={props.school.image}
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Box>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="3" color="red">
              {props.school.area}
            </Text>
            {props.school.text}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SchoolLine;
