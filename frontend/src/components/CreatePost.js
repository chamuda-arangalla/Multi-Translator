import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import '../css/createPost.css'; 
import { useEffect } from 'react';
import jwt from 'jwt-decode';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwt(token);
      const userId = decoded.userId;

      try {
        const response = await axios.post("http://localhost:3017/auth/profile", { userId });
        setName(response.data.firstname + ' ' + response.data.lastname);
      } catch (error) {
        alert('Data Load Unsuccessful' + error);
        console.error(error);
      }
    };

    fetchProfileDetails();
  }, []);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    if (title.trim() === '') {
      setTitleError('Title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (content.trim() === '') {
      setContentError('Content is required.');
      isValid = false;
    } else {
      setContentError('');
    }

    if (!isValid) {
      return; // Do not submit the form if there are validation errors.
    }

    try {
      const response = await axios.post('http://localhost:3017/api/posts/posts', {
        title,
        content,
        name,
      });

      console.log('Post created:', response.data);

      // Clear the form fields after successful submission
      setTitle('');
      setContent('');

      alert('Post created successfully');
      navigate(`/allpost`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div class="container mt-5">
        <button className="backbutton_post" onClick={() => {navigate('/allpost')}}>back</button>
        <div className="card" style={{width: "50rem", height: "50rem", backgroundColor: "#FFFFED"}}>
            <div class="row">
                <div style={{ padding: '20px', maxWidth: '1500px', margin: '0 auto' }}>
                    <div class="col-md-8 mx-auto">
                        <h2 style={{ textAlign: 'left', marginBottom: '20px', fontSize: '30px' }}>
                            <strong>Create New Post</strong>
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label htmlFor="title" class="form-label"><strong>Title:</strong></label>
                                <input type="text" class="form-control" id="title" value={title} onChange={handleTitleChange} />
                                {titleError && <p class="text-danger mt-2">{titleError}</p>}
                            </div>
                            <div class="mb-3">
                                <label htmlFor="content" class="form-label"><strong>Content:</strong></label>
                                <textarea class="form-control" id="content" value={content} onChange={handleContentChange} rows="8"></textarea>
                                {contentError && <p class="text-danger mt-2">{contentError}</p>}
                            </div>
                            <button type="submit" 
                                class="btn btn-primary" 
                                style={{ backgroundColor: 'black', color: 'white', width: '200px', marginBottom: '20px', padding: '5px 5px', fontSize: '15px' }}>
                                Create Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}

export default CreatePost;
