import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useForm } from "hooks/useForm";
import axios from "axios";
import { getDatabaseConnection } from "lib/getDatabaseConnection";

type Props = {
  id: number;
  post: Post;
};

const PostsEdit: NextPage<Props> = (props) => {
  const { post, id } = props;
  const { form } = useForm({
    initFormData: { title: post.title, content: post.content },
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
      request: (formData) =>
        axios.patch(`/api/v1/posts/${id}`, { ...formData, id }),
      success: () => {
        window.alert("提交成功");
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

export default PostsEdit;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne("Post", id);
  return {
    props: {
      id: parseInt(id.toString()),
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
