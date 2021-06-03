import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import { withSession } from "lib/withSession";
import { User } from "src/entity/User";
import { useForm } from "../hooks/useForm";
import qs from "querystring";
import style from "styles/pages/sign_form.module.css";
import Link from "next/link";

const SignIn: NextPage<{ user: User }> = (props) => {
  const { form } = useForm({
    initFormData: { username: "", password: "" },
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
    ],
    buttons: (
      <>
        <p className={style.tip}>
          没有账号？点击
          <Link href={`/sign_up?return_to=${encodeURIComponent("/sign_in")}`}>
            <a>注册</a>
          </Link>
        </p>
        <p className={style.action}>
          <button type="submit">登录</button>
        </p>
      </>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/sessions", formData),
      success: () => {
        window.alert("登录成功");
        const query = qs.parse(window.location.search.substr(1));

        window.location.href = query["return_to"]
          ? query["return_to"].toString()
          : "/posts";
      },
    },
  });

  return (
    <>
      <div className={style["form-wrapper"]}>
        {props.user && <div>当前登录用户为：{props.user.username}</div>}
        <h1>登录</h1>
        {form}
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser");
    return {
      props: {
        user: user || "",
      },
    };
  }
);
