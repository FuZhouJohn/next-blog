import Link from "next/link";
import _ from "lodash";

type Options = {
  count: number;
  page: number;
  totalPage: number;
};
export const usePager = (options: Options) => {
  const { page, totalPage } = options;
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  numbers.push(totalPage);
  const pager = (
    <div>
      {page !== 1 && (
        <Link href={`?page=${page - 1}`}>
          <a>上一页</a>
        </Link>
      )}
      {_.uniq(numbers)
        .sort()
        .filter((n) => n >= 1 && n <= totalPage)
        .map((n) => (
          <Link href={""}>
            <a>{n}</a>
          </Link>
        ))}
      {page < totalPage && (
        <Link href={`?page=${page + 1}`}>
          <a>下一页</a>
        </Link>
      )}
      第 {page}/{totalPage} 页
    </div>
  );
  return {
    pager,
  };
};
