import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import qs from "querystring";
type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
};

const PostsIndex: NextPage<Props> = (props) => {
  const posts = props.posts;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </div>
      ))}
      <footer>
        共 {props.count} 篇文章，当前是 {props.page}/{props.totalPage} 页
        {props.page !== 1 && (
          <Link href={`?page=${props.page - 1}`}>
            <a>上一页</a>
          </Link>
        )}
        {props.page < props.totalPage && (
          <Link href={`?page=${props.page + 1}`}>
            <a>下一页</a>
          </Link>
        )}
      </footer>
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 获取页码
  const index = context.req.url.indexOf("?");
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = (query.page && parseInt(query.page.toString())) || 1;

  const perPage = 2;

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
