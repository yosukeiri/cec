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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

type FormDataSignup = {
  username: string;
  email: string;
  email_confirmation: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormDataSignup>();
  const { user } = useAuthContext();

  const onSubmitSignup: SubmitHandler<FormDataSignup> = async (data) => {
    try {
      //firebase宛にemail、passwordを送り、新規ユーザー登録をする。
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: data.username,
          });
          setDoc(doc(db, "userSchool", userCredential.user.uid), {
            applyFor: [],
          });
        })
        .then(() => {
          alert(`${data.username}さんのユーザー登録が完了しました。`);
        });
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        if (e.code === "auth/invalid-email") {
          alert("メールアドレスの形式が間違っています");
        } else if (e.code === "auth/email-already-in-use") {
          alert("指定のアドレスのユーザはすでに存在しています");
        } else if (e.code === "auth/weak-password") {
          alert("パスワードを6文字以上で入力してください");
        } else if (e.code === "auth/internal-error") {
          alert("何かしらのエラーが発生しました。入力内容をご確認ください");
        } else {
          alert(e);
        }
      }
    }
    reset();
  };

  return (
    <Layout>
      <Heading as="h2" mb={["5", "10"]} size={["md", "xl"]}>
        <Text align="center">サインアップ</Text>
      </Heading>
      <Box p={["30px 20px", "50px"]} bg="#AEFFBD">
        <form onSubmit={handleSubmit(onSubmitSignup)}>
          <Stack spacing={["5", "10"]} mb={["10", "20"]}>
            <Box>
              <dl>
                <dt>ユーザー名</dt>
                <dd>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="100%"
                    {...register("username", {
                      required: "ユーザー名を入力してください",
                      minLength: {
                        value: 2,
                        message: "2文字以上入力してください",
                      },
                    })}
                    placeholder="受験　太郎"
                  />
                </dd>
                <dd>
                  <Text color="red" m="0">
                    {errors.username && errors.username.message}
                  </Text>
                </dd>
              </dl>
            </Box>
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
                <dt>メールアドレス（確認用）</dt>
                <dd>
                  <Input
                    bg="#fff"
                    p="10px"
                    w="100%"
                    {...register("email_confirmation", {
                      required:
                        "確認のためメールアドレスを再入力してください。",
                      validate: (value) => {
                        return (
                          value === getValues("email") ||
                          "メールアドレスが一致しません"
                        );
                      },
                    })}
                    placeholder="確認のためメールアドレスを再入力"
                  />
                </dd>
                <dd>
                  <Text color="red" m="0">
                    {errors.email_confirmation &&
                      errors.email_confirmation.message}
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
              w={["140px", "204px"]}
              h={["40px", "54px"]}
              color={"#F0FCFF"}
              fontSize={["18px", "24px"]}
              type="submit"
            >
              サインアップ
            </Button>
          </Center>
        </form>
      </Box>
    </Layout>
  );
};

export default Signup;
