import {GetServerSideProps, NextPage} from 'next';
import UAParser, {IBrowser, IOS} from 'ua-parser-js';
import {useEffect, useState} from 'react';

type Props = {
    agent: { browser: IBrowser, os: IOS }
}
const Index: NextPage<Props> = (props) => {
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    useEffect(()=>{
        setWidth(document.documentElement.clientWidth)
        setHeight(document.documentElement.clientHeight)
    },[])
    return (
        <>
            <div>
                当前浏览器 {props.agent.browser.name} {props.agent.browser.version}
            </div>
            <div>
                当前浏览器 {props.agent.os.name} {props.agent.os.version}
            </div>
            <div>浏览器窗口大小 {width} * {height}</div>
        </>
    );
};
export default Index;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent'];
    const result = new UAParser(ua).getResult();
    return {
        props: {agent: {browser: result.browser, os: result.os}}
    };
};
