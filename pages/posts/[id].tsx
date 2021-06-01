import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import marked from "marked";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import styled from "styled-components";
import Link from "next/link";
import { withSession } from "../../lib/withSession";

type Props = {
  post: Post;
  currentUser: User | null;
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
  const { post, currentUser } = props;
  const markdown = marked(post.content);
  return (
    <Wrapper>
      <header>
        <Title>{post.title}</Title>
        {currentUser && (
          <p>
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
              <a>编辑文章</a>
            </Link>
          </p>
        )}
      </header>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    </Wrapper>
  );
};

export default PostShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> =
  withSession(async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne("Post", context.params.id);
    const currentUser = (context.req as any).session.get("currentUser") || null;
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
      },
    };
  });
