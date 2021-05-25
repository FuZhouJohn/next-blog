import {NextApiHandler} from 'next';
import {withIronSession} from 'next-iron-session';

export function withSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        // password: process.env.SECRET_COOKIE_PASSWORD,
        password: '1f9a7c08-db78-4a30-bb2c-d8ae2a87686c',
        cookieName: 'blog',
        cookieOptions:{
            secure:false
        }
    });
}
