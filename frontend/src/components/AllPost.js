import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/allPost.css'; 

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3017/api/posts/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to navigate to the SelectedPost page with the post ID
  const navigateToSelectedPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleReadMoreClick = (postId) => {
    // Toggle the visibility of the read more content
    const readMoreContent = document.getElementById(`read-more-${postId}`);
    readMoreContent.classList.toggle('read-more');

    // Toggle the "Read More" button text
    const readMoreBtn = document.getElementById(`read-more-btn-${postId}`);
    if (readMoreBtn.innerHTML === '...Read More') {
      readMoreBtn.innerHTML = '...Read More';
    } else {
      readMoreBtn.innerHTML = '...Read Less';
    }
  };

  // Function to filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>
        Explore the Articles
      </h2>
      <button
        style={{ display: 'block', margin: '0 auto', marginBottom: '20px', padding: '10px 20px', fontSize: '18px' }}
        className="btn btn-primary"
        onClick={() => {
          navigate(`/createpost`);
        }}
      >
        Create Post
      </button>

      <div style={{ marginBottom: '20px' }} className="input-group">
        <input
          type="text"
          style={{ flex: '1', padding: '10px', fontSize: '16px' }}
          className="form-control"
          placeholder="Search Posts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          style={{ marginLeft: '10px', fontSize: '16px' }}
          className="btn btn-danger"
          onClick={() => setSearchQuery('')}
        >
          Clear
        </button>
      </div>

      <hr style={{ marginBottom: '20px' }} />

      <div>
        {filteredPosts.map((post) => (
          <div key={post._id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h5 style={{ fontSize: '22px', marginBottom: '10px' }}>
              <a href="#" style={{ color: '#343a40', textDecoration: 'none' }} onClick={() => navigateToSelectedPost(post._id)}>
                {post.title}
              </a>
            </h5>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              {post.content.length > 200 ? (
                <>
                  {post.content.slice(0, 200)}
                  <span id={`read-more-${post._id}`} className="read-more">
                    {post.content.slice(200)}
                  </span>
                  <span id={`read-more-btn-${post._id}`} className="read-more-btn" onClick={() => handleReadMoreClick(post._id)}>
                    <strong>...Read More</strong>
                  </span>
                </>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '16px', margin: '0' }}>{post.content}</pre>
              )}
            </p>
            <div style={{ fontSize: '14px', color: '#868e96' }}>by: {post.name}</div>
          </div>
        ))}
      </div>
      <hr style={{ marginBottom: '20px' }} />
    </div>
  </div>

  );
}

export default AllPost;
