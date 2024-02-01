import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function capitalizeFirstLetter(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export const BlogComment = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState({
    nameError: '',
    commentError:''
  })
  const [reload, setReload] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [inputComment, setInputComment] = useState({
    author: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog data
        const blogResponse = await axios.get(
          `http://localhost:8000/blog/blog_by_id/${blog_id}`
        );
        setBlog(blogResponse.data.data);

        // Fetch comments data
        const commentsResponse = await axios.get(
          `http://localhost:8000/comment/comment_by_blog_id/${blog_id}`
        );
        setComments(commentsResponse.data.comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [blog_id, reload]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputComment((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(inputComment);
  };

  const handleSubmit = async () => {

    setError({
      nameError: '',
      commentError: ''
    });

    // Validate input fields
    if(!inputComment.author.trim() || !inputComment.content.trim()){
      if (!inputComment.author.trim()) {
        setError((prev) => ({ ...prev, nameError: 'Author name cannot be empty' }));
      }
      if (!inputComment.content.trim()) {
        setError((prev) => ({ ...prev, commentError: 'Comment content cannot be empty' }));
      }
    }
    else{
      try {
        if (editedCommentId) {
          // Edit existing comment
          console.log(editedCommentId);
          await axios.post(
            `http://localhost:8000/comment/update_comment/${editedCommentId}/`,
            inputComment
          );
        } else {
          // Add new comment
          await axios.post(
            `http://localhost:8000/comment/add_comment/${blog_id}`,
            inputComment
          );
        }
  
        setInputComment({
          author: "",
          content: "",
        });
        setReload((prev) => !prev);
        setEditedCommentId(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
    
    
  };

  const handleEdit = async (id) => {
    try {
      const commentResponse = await axios.get(
        `http://localhost:8000/comment/comment_by_id/${id}`
      );

      // Set the fetched data to inputComment for editing
      setInputComment({
        author: commentResponse.data.data.author,
        content: commentResponse.data.data.content,
      });
      setEditedCommentId(id);
    } catch (error) {
      console.error("Error fetching comment details:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/comment/delete_comment/${id}/`
      );
      console.log("Comment deleted successfully:", response.data);
      setReload(!reload);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>Blog Comments System</h1>
      </header>
      <div style={{textAlign:'right', margin:'10px 4% 0 0'}}>
        <Link to="/blogs"><button className="all_post_button">All Post</button></Link>
      </div>
      <main>
        <section id="blog-section">
          <h2>Blog Posts</h2>
          <div id="post-container">
            <p>
              <b>Title:</b> {capitalizeFirstLetter(blog.title)}
            </p>
            <p>
              <b>Date:</b> {capitalizeFirstLetter(blog.pub_date)}
            </p>
            <p>
              <b>Content:</b> {capitalizeFirstLetter(blog.content)}
            </p>
            <p>
              <b>Comments:</b>{" "}
              {comments.map((comment, idx) => (
                <div style={{ marginLeft: "30px" }}>
                  <p>
                    <b>{comment.author}</b>: {comment.content}
                  </p>
                  <button
                    style={{ marginRight: "20px" }}
                    onClick={(e) => {
                      handleEdit(comment.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(comment.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {comments.length === 0 && (
                <p style={{ marginLeft: "30px" }}>No Comments.</p>
              )}
            </p>
          </div>
        </section>
        <section id="comment-section">
          <h2>Add a Comment</h2>
          <div id="comment-form">
            <form className="form-group">
              <label for="name">Name:</label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                value={inputComment.author}
                name="author"
                required
              />
              <p style={{color:'red', margin:'2px'}}>{error.nameError}</p>
            </form>
            <div className="form-group">
              <label for="comment">Comment:</label>
              <textarea
                onChange={handleChange}
                value={inputComment.content}
                id="comment"
                name="content"
                rows="4"
                required
              ></textarea>
              <p style={{color:'red', margin:'2px'}}>{error.commentError}</p>
            </div>
            <button onClick={handleSubmit}>Submit Comment</button>
          </div>
        </section>
      </main>
      <script src="script.js"></script>
    </div>
  );
};
