import tt from 'assets/image/ttt.png';
import Link from 'next/link';
export default function Index() {
    return (
        <div className="main">
            <h1>标题 1</h1>
            <p>段落</p>
            <img src={tt} alt=""/>
            <Link href='/posts'>
                <a>文章列表</a>
            </Link>
            <style jsx>{`
              h1 {
                color: red
              }
            `} </style>
        </div>
    );
}
