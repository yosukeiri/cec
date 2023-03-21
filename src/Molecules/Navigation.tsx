import { Button, HStack, Spacer } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const ref = useRef(true);

  const signout = () => {
    signOut(auth)
      .then(() => {
        alert("サインアウトしました");
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    // 初回レンダリング時はrefをfalseにして、return。
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (user) {
      if (router.pathname === "/signup" || router.pathname === "/signin") {
        // router.push("/");
      }
    } else {
      if (router.pathname !== "/signup" && router.pathname !== "/signin") {
        // router.push("/signin");
      }
    }
  }, [user]);
  return (
    <>
      {user ? (
        <HStack w={["100%", "450px"]} spacing="5" justify="end">
          <Link href="/mypage">マイページ</Link>
          <Link href="/search">学校検索</Link>
          <Button onClick={signout}>サインアウト</Button>
        </HStack>
      ) : (
        <HStack w={["170px", "250px"]} spacing={["2", "5"]} justify="end">
          <Button
            as="a"
            href="/signup"
            bg="#aaaaaa"
            color="#fff"
            p={["2px 5px", "5px 10px"]}
            size={["xs", "sm", "md"]}
          >
            サインアップ
          </Button>
          <Button
            as="a"
            href="/signin"
            bg="#aaaaaa"
            color="#fff"
            p={["2px 5px", "5px 10px"]}
            size={["xs", "sm", "md"]}
          >
            サインイン
          </Button>
        </HStack>
      )}
    </>
  );
};

export default Navigation;
