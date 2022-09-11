import { useMutation, useQuery } from "react-query";
import { deletePost, fetchComments, updatePost } from "./API/api";

export function PostDetail({ post }) {
  console.log(post.id);
  const { data, isLoading, isError } = useQuery(
    ["fetchComments", post.id],
    () => fetchComments(post.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error delete post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Loading delete post...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "blue" }}>Deleted post...</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>

      {updateMutation.isError && <p>Error Update post</p>}
      {updateMutation.isLoading && <p>Loading update post...</p>}
      {updateMutation.isSuccess && <p>Success update</p>}

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
