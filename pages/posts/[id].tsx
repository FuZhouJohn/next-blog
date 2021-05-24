import {GetServerSideProps, NextPage} from 'next';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';

type Props = {
    post: Post
}

const PostShow: NextPage<Props> = (props) => {
    const {post} = props;
    marked.setOptions({
        highlight(code, lang) {
            return hljs.highlight(code, {language: lang}).value;
        }
    });
    const markdown = marked(post.content);
    return (
        <>
            <h1>{post.title}</h1>
            <p>日期：{post.createdAt}</p>
            <hr/>
            <article id="preview" dangerouslySetInnerHTML={{__html: markdown}}>
            </article>
            <style jsx>{`
              h1, p {
                padding: 0 10px;
              }
            `}</style>
            <style global jsx>{`
              #preview {
                padding: 0 10px;

                pre {
                  background-color: rgb(246, 248, 250);
                  padding: 16px;
                  border-radius: 6px;
                }
              }
            `}</style>
        </>
    );
};

export default PostShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    console.log(context.params.id);
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        },

    };
};
