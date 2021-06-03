import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import marked from "marked";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import Link from "next/link";
import { withSession } from "lib/withSession";
import { MouseEventHandler, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  post: Post;
  currentUser: User | null;
  id: number;
};

const PostShow: NextPage<Props> = (props) => {
  const { post, currentUser, id } = props;
  const router = useRouter();
  const markdown = marked(post.content);
  const onRemove: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      axios.delete(`/api/v1/posts/${id}`).then(
        async () => {
          window.alert("删除成功");
          await router.push("/posts");
        },
        () => {
          window.alert("删除失败");
        }
      );
    },
    [id]
  );
  return (
    <>
      <div className="wrapper">
        <header>
          <h1 className="title">{post.title}</h1>
          {currentUser && currentUser.id === post.author.id && (
            <p className="action">
              <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
                <a>编辑文章</a>
              </Link>
              |<a onClick={onRemove}>删除</a>
            </p>
          )}
        </header>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
      <style jsx global>{`
        .wrapper {
          max-width: 800px;
          margin: 16px auto;
          padding: 0 16px;
        }
        .title {
          border-bottom: 1px solid #666;
          padding-bottom: 16px;
        }
        .action {
          > * {
            margin: 4px;
            cursor: pointer;
          }
          > *:first-child {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default PostShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> =
  withSession(async (context: GetServerSidePropsContext) => {
    const { id } = context.params;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne("Post", id, {
      relations: ["author"],
    });
    const currentUser = (context.req as any).session.get("currentUser") || null;
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
        id: parseInt(id.toString()),
      },
    };
  });
