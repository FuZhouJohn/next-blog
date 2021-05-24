import {GetServerSideProps, NextPage} from 'next';
import UAParser, {IBrowser, IOS} from 'ua-parser-js';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';

type Props = {
    posts:Post[]
}
const Index: NextPage<Props> = (props) => {
    const {posts} = props
    return (
        <div>
            <h1>文章列表</h1>
            <ul>
                {posts.map(post =>
                    <li>
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <a>
                                {post.title}
                            </a>
                        </Link>
                    </li>
                )}
            </ul>

        </div>
    );
};
export default Index;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDatabaseConnection();
    const posts = await connection.manager.find(Post);
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },

    };
};
