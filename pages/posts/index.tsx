import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
type Props = {
  posts: Post[];
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
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
