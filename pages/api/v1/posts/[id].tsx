import { NextApiHandler } from "next";
import { Post } from "src/entity/Post";
import { withSession } from "lib/withSession";
import { getDatabaseConnection } from "lib/getDatabaseConnection";

const Posts: NextApiHandler = async (req, res) => {
  const user = req.session.get("currentUser");
  if (req.method === "PATCH") {
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
  } else if (req.method === "DELETE") {
    const id = req.query.id.toString();
    if (!user) {
      res.status(401).end();
      return;
    }
    const connection = await getDatabaseConnection();
    const { affected } = await connection.manager.delete("Post", id);
    if (affected >= 0) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }
};

export default withSession(Posts);
