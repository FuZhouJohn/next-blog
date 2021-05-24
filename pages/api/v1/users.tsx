import {NextApiHandler} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirmation} = req.body;
    const errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[]
    };
    if (username.trim() === '') {
        errors.username.push('不能为空');
    }
    if(!/[a-zA-z0-9]/.test(username.trim())){
        errors.username.push('格式不合法');
    }
    if(username.trim().length >42){
        errors.username.push('太长');
    }
    if(username.trim().length <= 3){
        errors.username.push('太短');
    }
    if(password===''){
        errors.username.push('不能为空');
    }
    if (password !== passwordConfirmation) {
        errors.passwordConfirmation.push('密码不匹配');
    }
    const hasErrors = Object.values(errors).find(v=>v.length>0)
    if(hasErrors){
        res.status(422).json(errors);
        return
    }

    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username.trim()
    user.passwordDigest = md5(password)
    await connection.manager.save(user)
    res.status(200).json(user);
};

export default Users;
