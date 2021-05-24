import {GetServerSideProps, NextPage} from 'next';
import UAParser, {IBrowser, IOS} from 'ua-parser-js';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';

type Props = {
    agent: { browser: IBrowser, os: IOS }
}
const Index: NextPage<Props> = (props) => {
    return (
        <>
            <div>
                当前浏览器 {props.agent.browser.name} {props.agent.browser.version}
            </div>
            <div>
                当前浏览器 {props.agent.os.name} {props.agent.os.version}
            </div>
        </>
    );
};
export default Index;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDatabaseConnection()
    const ua = context.req.headers['user-agent'];
    const result = new UAParser(ua).getResult();
    return {
        props: {agent: {browser: result.browser, os: result.os}}
    };
};
