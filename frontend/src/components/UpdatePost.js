import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/updatePost.css'; // Import the separate CSS file for SelectedPost
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function UpdatePost(props) {
  //const postId = props.match.params.postId; // Get the post ID from the route params
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({ title: '', content: '' });
  const { postId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch the selected post's details
    axios.get(`http://localhost:3017/api/posts/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        // Initialize the updatedPost state with the current post data
        setUpdatedPost({ title: response.data.title, content: response.data.content });
      })
      .catch((error) => {
        console.error('Error fetching post details:', error);
      });
  }, [postId]);

  const handleInputChange = (e) => {
    // Update the updatedPost state based on user input
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Send a PUT request to update the post
    axios.put(`http://localhost:3017/api/posts/posts/${postId}`, updatedPost)
      .then(() => {
        // Redirect to the selected post or perform any other action
        navigate(`/post/${postId}`); // You can adjust the redirection URL as needed
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div class="container mt-5">
      <div className="card" style={{width: "50rem", height: "35rem"}}>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="text-center mb-4">Update Post</h2>
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title:</label>
                    <input type="text" class="form-control" id="title" name="title" style={{ width: "30rem"}} value={updatedPost.title} onChange={handleInputChange} />
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content:</label>
                    <textarea class="form-control" id="content" name="content" style={{ width: "30rem", height:"18rem"}} value={updatedPost.content} onChange={handleInputChange} rows="6"></textarea>
                </div>
                <div class="mb-3 text-center">
                    <button type="button" class="btn btn-primary" onClick={handleSubmit}>Update</button>
                </div>
            </form>
        </div>
    </div>
    </div>
</div>

  );
}

export default UpdatePost;