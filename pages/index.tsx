import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Cover = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 300px;
    height: auto;
  }
`;

const Home: NextPage = () => {
  return (
    <Cover>
      <img src="/logo.png" alt="" />
      <h1>ZJN 的博客</h1>
      <p>装逼的文字 8.0</p>
      <p>
        <Link href="/posts">
          <a>文章列表</a>
        </Link>
      </p>
    </Cover>
  );
};

export default Home;
