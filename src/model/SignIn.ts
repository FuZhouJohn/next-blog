import { User } from "src/entity/User";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";

export class SignIn {
  user: User;
  errors = { username: [] as string[], password: [] as string[] };

  constructor(public username: string, public password: string) {}
  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("请填写用户名");
    }

    const user = await (
      await getDatabaseConnection()
    ).manager.findOne(User, { where: { username: this.username } });
    this.user = user;
    if (user) {
      if (md5(this.password) !== user.passwordDigest) {
        this.errors.password.push("密码不匹配");
      }
    } else {
      this.errors.username.push("用户名不存在");
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find((v) => v.length > 0);
  }
}
