import { NextPage } from "next";
import axios from "axios";
import { useForm } from "hooks/useForm";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 16px;
  .field-content textarea {
    height: 20em;
    resize: none;
  }
  .label-text {
    width: 4em;
    text-align: right;
  }
  .action {
    text-align: center;
    background-color: #ddd;
    padding: 4px 0;
  }
`;
const Action = styled.div`
  text-align: center;
`;
const PostsNew: NextPage = () => {
  const { form } = useForm({
    initFormData: { title: "", content: "" },
    fields: [
      { label: "大标题", type: "text", key: "title" },
      { label: "内容", type: "textarea", key: "content" },
    ],
    buttons: (
      <div className="action">
        <button type="submit">提交</button>
      </div>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/posts", formData),
      success: () => {
        window.alert("提交成功");
        window.location.href = "/posts";
      },
    },
  });

  return <Wrapper>{form}</Wrapper>;
};

export default PostsNew;
