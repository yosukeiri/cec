import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Heading,
  Input,
  Button,
  Center,
  Text,
  Stack,
} from "@chakra-ui/react";
import Layout from "../Templates/Layout";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

type FormDataSignin = {
  email: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataSignin>();

  const onSubmitSignin: SubmitHandler<FormDataSignin> = async (data) => {
    try {
      //firebase宛にemail、passwordを送り、ログイン認証をする。
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        if (e instanceof FirebaseError) {
          if (e.code === "auth/invalid-email") {
            alert("メールアドレスの形式が間違っています");
          } else if (e.code === "auth/user-disabled") {
            alert("指定のアドレスのユーザが無効になっています");
          } else if (e.code === "auth/user-not-found") {
            alert("指定のアドレスのユーザが存在しません");
          } else if (e.code === "auth/wrong-password") {
            alert("指定のアドレスのパスワードが間違っています");
          } else if (e.code === "auth/too-many-requests") {
            alert("何度もパスワードを間違えました");
          } else if (e.code === "auth/internal-error") {
            alert("何かしらのエラーが発生しました。入力内容をご確認ください");
          } else {
            alert(e);
          }
        }
      }
    }
    reset();
  };

  return (
    <Layout>
      <Heading as="h2" mb="10">
        <Text align="center">サインイン</Text>
      </Heading>
      <Box bg="#ccc" p="50px">
        <form onSubmit={handleSubmit(onSubmitSignin)}>
          <Stack spacing={10} mb={20}>
            <Box>
              <dl>
                <dt>メールアドレス</dt>
                <dd>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="100%"
                    {...register("email", {
                      required: "メールアドレスを入力してください。",
                      pattern: {
                        value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                        message: "入力形式がメールアドレスではありません。",
                      },
                    })}
                    placeholder="test@test.jp"
                  />
                </dd>
                <dd>
                  <Text color="red" m="0">
                    {errors.email && errors.email.message}
                  </Text>
                </dd>
              </dl>
            </Box>
            <Box>
              <dl>
                <dt>パスワード</dt>
                <dd>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="100%"
                    type="password"
                    {...register("password", {
                      required: "パスワードを入力してください",
                      minLength: {
                        value: 4,
                        message: "4文字以上入力してください",
                      },
                      pattern: {
                        value: /[A-Za-z]/,
                        message: "半角英数字で入力してください",
                      },
                    })}
                    placeholder="6文字以上の英数字で入力してください"
                  />
                </dd>
                <dd>
                  <Text color="red" m="0">
                    {errors.password && errors.password.message}
                  </Text>
                </dd>
              </dl>
            </Box>
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
              サインイン
            </Button>
          </Center>
        </form>
      </Box>
    </Layout>
  );
};

export default Signin;
