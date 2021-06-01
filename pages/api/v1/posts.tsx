import { NextApiHandler } from "next";
import { Post } from "src/entity/Post";
import { withSession } from "lib/withSession";
import { getDatabaseConnection } from "lib/getDatabaseConnection";

const Posts: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = req.session.get("currentUser");
      if (!user) {
        res.status(401).end();
        return;
      }
      const { title, content } = req.body;
      if (title.trim() === "") {
        res.status(422).json({ title: ["标题不能为空"] });
        return;
      }
      const post = new Post();
      post.title = title;
      post.content = content;

      post.author = user;
      const connection = await getDatabaseConnection();
      await connection.manager.save(post);
      res.json(post);
      break;
  }
};

export default withSession(Posts);
