import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
  const navigate = Navigate();
  const { id } = useParams();
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const editPost = useStoreActions((actions) => actions.editPost);

  const setPostById = useStoreActions((actions) => actions.setPostById);
  const post = setPostById(id);

  const handleEdit = async (id) => {
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, date, body: editBody };

    editPost(updatedPost);
    navigate("/");
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Edit Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="postBody">Edit Body</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}

      {!editTitle && (
        <>
          <h2>Post Not Found!</h2>
          <p>Well, That's disappointing</p>

          <p>
            <Link to="/">Visit Our website</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
