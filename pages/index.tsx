import tt from 'assets/image/ttt.png';

export default function Index() {
    return (
        <div className="main">
            <h1>标题 1</h1>
            <p>段落</p>
            <img src={tt} alt=""/>
            <style jsx>{`
              h1 {
                color: red
              }
            `} </style>
        </div>
    );
}
