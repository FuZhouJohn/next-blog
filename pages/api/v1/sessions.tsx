import { NextApiHandler } from "next";
import { SignIn } from "src/model/SignIn";
import { withSession } from "lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const signIn = new SignIn(username, password);
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.status(422).json(signIn.errors);
  } else {
    req.session.set("currentUser", signIn.user);
    await req.session.save();
    res.status(200).json(signIn.user);
  }
};

export default withSession(Sessions);
