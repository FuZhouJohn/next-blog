import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import { withSession } from "lib/withSession";
import { User } from "src/entity/User";
import { useForm } from "../lib/hooks/useForm";
import qs from "query-string";

const SignIn: NextPage<{ user: User }> = (props) => {
  const { form } = useForm({
    initFormData: { username: "", password: "" },
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
    ],
    buttons: (
      <>
        <button type="submit">登录</button>
      </>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/sessions", formData),
      success: () => {
        window.alert("登录成功");
        console.log(window.location.search);
        const parsed = qs.parse("?returnTo=%2Fposts%2Fnew");
        console.log(parsed);
      },
    },
  });

  return (
    <div>
      {props.user && <div>当前登录用户为：{props.user.username}</div>}
      <h1>登录</h1>
      {form}
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser");
    console.log(user);
    return {
      props: {
        user: user || "",
      },
    };
  }
);
