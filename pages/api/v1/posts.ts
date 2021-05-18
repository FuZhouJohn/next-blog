import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';

const Posts: NextApiHandler = async (req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);
};

export default Posts;
