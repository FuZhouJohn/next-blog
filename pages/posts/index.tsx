import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import qs from "querystring";
import { usePager } from "hooks/usePager";
import styled from "styled-components";
import { withSession } from "lib/withSession";
type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
  currentUser: User | null;
};

const Posts = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  > header {
    display: flex;
    align-items: center;
    h1 {
      margin: 0 auto 0 0;
    }
  }
`;
const OnePost = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  > a {
    border-bottom: none;
    color: #000;
    &:hover {
      color: #8d0033;
    }
  }
`;

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, count, totalPage, page, currentUser } = props;
  const { pager } = usePager({
    count,
    totalPage,
    page,
  });
  return (
    <Posts>
      <header>
        <h1>文章列表</h1>
        {currentUser && (
          <Link href="/posts/new">
            <a>新增文章</a>
          </Link>
        )}
      </header>
      {posts.map((p) => (
        <OnePost key={p.id}>
          <Link href="/posts/[id]" as={`/posts/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </OnePost>
      ))}
      <footer>{pager}</footer>
    </Posts>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // 获取页码
    const index = context.req.url.indexOf("?");
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);
    const page = (query.page && parseInt(query.page.toString())) || 1;
    const currentUser = (context.req as any).session.get("currentUser") || null;
    const perPage = 10;

    const connection = await getDatabaseConnection();
    const [posts, count] = await connection.manager.findAndCount(Post, {
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        count,
        perPage,
        page,
        totalPage: Math.ceil(count / perPage),
        currentUser,
      },
    };
  }
);
