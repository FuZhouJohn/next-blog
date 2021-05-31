import "reflect-metadata";
import { createConnection, getConnectionManager } from "typeorm";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";
import config from "ormconfig.json";

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    port: process.env.NODE_ENV === "production" ? 5433 : config.port,
    // host:
    //   process.env.NODE_ENV === "production" ? "192.168.100.40" : config.host,
    entities: [Post, User, Comment],
  });
};
const promise = (async function () {
  const manager = getConnectionManager();
  const current = manager.has("default") && manager.get("default");
  if (current) {
    await current.close();
  }
  return create();
})();

export const getDatabaseConnection = async () => {
  return promise;
};
