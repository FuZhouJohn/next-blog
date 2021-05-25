import {NextApiHandler} from 'next';
import {SignIn} from 'src/model/SignIn';

const Sessions: NextApiHandler = async (req, res) => {
    const {username, password} = req.body;
    const signIn = new SignIn(username,password)

    await signIn.validate()
    if(signIn.hasErrors()){
        res.status(422).json(signIn.errors)
    } else {
        res.status(200).json(signIn.user)
    }
};

export default Sessions;
