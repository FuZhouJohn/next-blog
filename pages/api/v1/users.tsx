import {NextApiHandler} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';

const Users: NextApiHandler = async (req, res) => {
    const connection = await getDatabaseConnection();
    const {username, password, passwordConfirmation} = req.body;
    const user = new User();
    user.username = username.trim()
    user.password = password
    user.passwordConfirmation = passwordConfirmation

    await user.validate()
    if(user.hasErrors()){
        res.status(422).json(user.errors);
        return
    }


    await connection.manager.save(user)
    res.status(200).json(user);
};

export default Users;
