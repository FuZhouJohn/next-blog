import Link from "next/link";
import _ from "lodash";
import styled from "styled-components";

type Options = {
  count: number;
  page: number;
  totalPage: number;
  urlMaker?: (page: number) => string;
};

const Wrapper = styled.div`
  margin-top: 20px;
`;

const PageNumbersWrapper = styled.span`
  & + & {
    margin-left: 10px;
  }
  a {
    text-decoration: none;
  }
  &.active {
    font-weight: bold;
  }
`;

const defaultUrlMaker = (n: number) => `?page=${n}`;

export const usePager = (options: Options) => {
  const { page, totalPage, urlMaker: _urlMaker } = options;
  const urlMaker = _urlMaker || defaultUrlMaker;
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  numbers.push(totalPage);
  const pageNumbers = _.uniq(numbers)
    .sort()
    .filter((n) => n >= 1 && n <= totalPage)
    .reduce(
      (result, n) =>
        n - (result[result.length - 1] || 0) === 1
          ? result.concat(n)
          : result.concat(-1, n),
      []
    );

  const pager = (
    <Wrapper>
      {page !== 1 && (
        <PageNumbersWrapper>
          <Link href={urlMaker(page - 1)}>
            <a>&lt;</a>
          </Link>
        </PageNumbersWrapper>
      )}
      {pageNumbers.map((n) =>
        n === -1 ? (
          <PageNumbersWrapper key={n}>
            <span>...</span>
          </PageNumbersWrapper>
        ) : n === page ? (
          <PageNumbersWrapper className="active" key={n}>
            <span>{n}</span>
          </PageNumbersWrapper>
        ) : (
          <PageNumbersWrapper key={n}>
            <Link href={urlMaker(n)} key={n}>
              <a>{n}</a>
            </Link>
          </PageNumbersWrapper>
        )
      )}
      {page < totalPage && (
        <PageNumbersWrapper>
          {" "}
          <Link href={urlMaker(page + 1)}>
            <a>&gt;</a>
          </Link>
        </PageNumbersWrapper>
      )}
      <PageNumbersWrapper>
        第 {page}/{totalPage} 页
      </PageNumbersWrapper>
    </Wrapper>
  );
  return {
    pager,
  };
};
