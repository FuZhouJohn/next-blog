import { GetServerSideProps, NextPage } from "next";
import marked from "marked";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import styled from "styled-components";

type Props = {
  post: Post;
};
const Wrapper = styled.div`
  max-width: 800px;
  margin: 16px auto;
  padding: 0 16px;
`;
const Title = styled.h1`
  border-bottom: 1px solid #666;
  padding-bottom: 16px;
`;

const PostShow: NextPage<Props> = (props) => {
  const { post } = props;
  const markdown = marked(post.content);
  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    </Wrapper>
  );
};

export default PostShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> =
  async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  };
