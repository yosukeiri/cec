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
import { collection, Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

type DATA = typeof Data;
type PROPS = {
  school: DATA;
};
const SchoolLine = (props: PROPS) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();

  const date01 = new Date(props.school.applicationDeadline);
  const date02 = new Date(props.school.entranceExamDate);
  const date03 = new Date(props.school.announcementDate);
  const date04 = new Date(props.school.paymentDeadline);

  const schoolRegister = async () => {
    console.log(user);
    try {
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <Tr>
        <Td>{props.school.schoolName}</Td>
        <Td>
          <Text align="center">{props.school.area}</Text>
        </Td>
        <Td>
          <Text align="center">
            {date01.getMonth() + 1}/{date01.getDate()}
          </Text>
        </Td>
        <Td>
          <Text align="center">
            {date02.getMonth() + 1}/{date02.getDate()}
          </Text>
        </Td>
        <Td>
          <Text align="center">
            {date03.getMonth() + 1}/{date03.getDate()}
          </Text>
        </Td>
        <Td>
          <Text align="center">
            {date04.getMonth() + 1}/{date04.getDate()}
          </Text>
        </Td>
        <Td>
          <Button colorScheme="blue" onClick={onOpen}>
            詳細
          </Button>
        </Td>
        <Td>
          <Button colorScheme="orange" onClick={schoolRegister}>
            登録
          </Button>
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.school.schoolName}</ModalHeader>
          <Text>{props.school.area}</Text>
          <Box style={{ position: "relative", width: "100%", height: "300px" }}>
            <Image
              src={props.school.image}
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Box>
          <ModalCloseButton />
          <ModalBody>{props.school.text}</ModalBody>

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
