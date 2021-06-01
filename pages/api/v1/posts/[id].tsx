import { NextApiHandler } from "next";
import { Post } from "src/entity/Post";
import { withSession } from "lib/withSession";
import { getDatabaseConnection } from "lib/getDatabaseConnection";

const Posts: NextApiHandler = async (req, res) => {
  if (req.method === "PATCH") {
    const user = req.session.get("currentUser");
    if (!user) {
      res.status(401).end();
      return;
    }
    const { title, content, id } = req.body;
    if (title.trim() === "") {
      res.status(422).json({ title: ["标题不能为空"] });
      return;
    }
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne<Post>("Post", id);
    post.title = title;
    post.content = content;

    await connection.manager.save("Post", post);
    res.json(post);
  }
};

export default withSession(Posts);
