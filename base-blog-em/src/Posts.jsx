import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchPosts } from "./API/api";
import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  /**
   * @param : query의 key와 서버 요청을 위한 비동기 query 함수
   * @returns : data, isError 등 상태를 반환, 이를 구조분해로 사용할 수 있음
   */
  const { data, isLoading, isError, error } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      refetchOnWindowFocus: false,
      staleTime: 10000,
      // keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Not data</div>;
  }

  if (isError) {
    return (
      <>
        <div>Oops Error!!!</div>
        <span>{error.toString()}</span>
      </>
    );
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
