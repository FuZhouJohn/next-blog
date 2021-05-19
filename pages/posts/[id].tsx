import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getPost, getPostIds,} from '../../lib/posts';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';
import {ParsedUrlQuery} from 'querystring';

type Props = {
    post: Post
}

const Post: NextPage<Props> = (props) => {
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
            <p>日期：{post.date}</p>
            <hr/>
            <article id="preview" dangerouslySetInnerHTML={{__html: markdown}}>
            </article>
            <style jsx>{`
              #preview {
                padding: 0 10px;
              }

              h1, p {
                padding: 0 10px;
              }
            `}</style>
        </>
    );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await getPostIds();
    return {
        paths: ids.map(id => ({params: {id}})),
        fallback: false
    };
};

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const id = context.params?.id;
    const post = id ? await getPost(id) : {};
    return {
        props: {
            post
        }
    };
};
