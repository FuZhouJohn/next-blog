import {NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const SignIn: NextPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: [], password: []
    });
    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        setErrors({username: [], password: []});
        await axios.post('/api/v1/sessions', formData).then((response) => {
            window.alert('登录成功');
        }, (error) => {
            if (error.response) {
                const response: AxiosResponse = error.response;
                if (response.status === 422) {
                    setErrors(response.data);
                }
            }
        });
    }, [formData]);
    return (
        <>
            <h1>登录</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="">用户名
                        <input type="text" value={formData.username} onChange={e => setFormData({
                            ...formData,
                            username: e.target.value
                        })}/>
                    </label>
                    {errors.username?.length > 0 && <div>
                        {errors.username.join('，')}
                    </div>}
                </div>
                <div>
                    <label htmlFor="">密码
                        <input type="password" value={formData.password} onChange={e => setFormData({
                            ...formData,
                            password: e.target.value
                        })}/>
                    </label>
                    {errors.password?.length > 0 && <div>
                        {errors.password.join('，')}
                    </div>}
                </div>
                <div>
                    <button type="submit">登录</button>
                </div>
            </form>

        </>
    );
};

export default SignIn;
