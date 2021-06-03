import { NextPage } from "next";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import qs from "querystring";
import style from "styles/pages/sign_form.module.css";

const SignUp: NextPage = () => {
  console.log(style);
  const { form } = useForm({
    initFormData: { username: "", password: "", passwordConfirmation: "" },
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
      { label: "确认密码", type: "password", key: "passwordConfirmation" },
    ],
    buttons: (
      <p className={style.action}>
        <button type="submit">注册</button>
      </p>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/users", formData),
      success: () => {
        window.alert("注册成功");
        const query = qs.parse(window.location.search.substr(1));

        window.location.href = query["return_to"]
          ? query["return_to"].toString()
          : "/posts";
      },
    },
  });

  return (
    <div className={style["form-wrapper"]}>
      <h1>注册</h1>
      {form}
    </div>
  );
};

export default SignUp;
