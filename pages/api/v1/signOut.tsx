import { NextApiHandler } from "next";
import { withSession } from "lib/withSession";

const SignOut: NextApiHandler = (req, res) => {
  req.session.destroy();
  res.status(200).end("Signed out");
};

export default withSession(SignOut);
