import { useQuery } from "react-query";
import { fetchComments } from "./API/api";

export function PostDetail({ post }) {
  const { data, isLoading, isError } = useQuery(
    ["fetchComments", post.id],
    () => fetchComments(post.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
