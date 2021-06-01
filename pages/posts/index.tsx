import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import qs from "querystring";
import { usePager } from "../../lib/hooks/usePager";
import styled from "styled-components";
type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
};

const Posts = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;
const OnePost = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 8px 0px;
  > a {
    border-bottom: none;
    color: #000;
    &:hover {
      color: #8d0033;
    }
  }
`;

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, count, totalPage, page } = props;
  const { pager } = usePager({
    count,
    totalPage,
    page,
  });
  return (
    <Posts>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <OnePost key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </OnePost>
      ))}
      <footer>{pager}</footer>
    </Posts>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 获取页码
  const index = context.req.url.indexOf("?");
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = (query.page && parseInt(query.page.toString())) || 1;

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
    },
  };
};
