import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
createConnection()
  .then(async (connection) => {
    const { manager } = connection;

    const user = new User();
    user.username = "zhuang5";
    user.passwordDigest = "xxx";
    await manager.save(user);

    const post = new Post();
    post.title = "这是一个标题4";
    post.content = "随便写点啥4";
    post.author = user;
    await manager.save(post);

    const comment = new Comment();
    comment.content = "键盘侠启动";
    comment.post = post;
    comment.user = user;
    await manager.save(comment);

    await connection.close();
    console.log("ok");
  })
  .catch((error) => console.log(error));
