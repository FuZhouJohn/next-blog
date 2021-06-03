import { NextPage } from "next";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";

const PostsNew: NextPage = () => {
  const router = useRouter();
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
      success: async () => {
        window.alert("提交成功");
        await router.push("/posts");
      },
    },
  });

  return (
    <>
      <div className="posts-edit">{form}</div>
      <style jsx global>{`
        .posts-edit {
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
        }
      `}</style>
    </>
  );
};

export default PostsNew;
