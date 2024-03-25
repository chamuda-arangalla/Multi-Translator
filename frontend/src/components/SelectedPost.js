import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/selectedPost.css';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import jsPDF from 'jspdf';






function SelectedPost(props) {
    const { postId } = useParams();
    console.log(postId);
    //const postId = props.match.params.postId; // Get the post ID from the route params
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState({ id: null, text: '' });
    const [commentReplies, setCommentReplies] = useState({});
    const navigate = useNavigate();

    const [name, setName] = useState('');


    useEffect(() => {

        const fetchProfileDetails = async () => {
            const token = localStorage.getItem('token')
            const decoded = jwt(token);
            const userId = decoded.userId;

            try {


                const response = await axios.post("http://localhost:3017/auth/profile", { userId });

                setName(response.data.firstname + ' ' + response.data.lastname);

            } catch (error) {
                alert('Data Load Unsuccessfull' + error);
                console.log(error);
            }
        };

        fetchProfileDetails();



    }, [])


    useEffect(() => {

        // Fetch the selected post's details
        axios.get(`http://localhost:3017/api/posts/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post details:', error);
            });

        // Fetch comments related to the selected post
        axios.get(`http://localhost:3017/api/comments/posts/${postId}/comments`)
            .then((response) => {
                setComments(response.data.reverse());
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [postId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = () => {
        // Send a POST request to add a new comment
        axios.post(`http://localhost:3017/api/comments/posts/${postId}/comments`, {
            postId,
            text: newComment,
            name: name,
        })
            .then((response) => {
                // Update the comments state with the newly added comment
                setComments([ response.data, ...comments]);
                // Clear the comment input field
                setNewComment('');
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    const handleDeleteComment = (commentId) => {
        // Send a DELETE request to delete the comment
        axios.delete(`http://localhost:3017/api/comments/comments/${commentId}`)
            .then(() => {
                // Remove the deleted comment from the comments state
                const updatedComments = comments.filter((comment) => comment._id !== commentId);
                setComments(updatedComments);
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });
    };

    const handleEditComment = (commentId, text) => {
        // Set the comment ID and text in the editComment state
        setEditComment({ id: commentId, text });
    };

    const handleUpdateComment = (commentId) => {
        // Send a PUT or PATCH request to update the comment
        axios.put(`http://localhost:3017/api/comments/comments/${commentId}`, {
            text: editComment.text,
        })
            .then(() => {
                // Update the UI with the edited comment text
                const updatedComments = comments.map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, text: editComment.text };
                    }
                    return comment;
                });
                setComments(updatedComments);
                // Clear the editComment state
                setEditComment({ id: null, text: '' });
            })
            .catch((error) => {
                console.error('Error updating comment:', error);
            });
    };

    const handleDeletePost = () => {
        // Send a GET request to fetch all comments related to the post
        axios.get(`http://localhost:3017/api/comments/posts/${postId}/comments`)
            .then((response) => {
                const commentsToDelete = response.data;
                // Delete each comment one by one
                Promise.all(
                    commentsToDelete.map((comment) =>
                        axios.delete(`http://localhost:3017/api/comments/comments/${comment._id}`)
                    )
                )
                    .then(() => {
                        // After deleting all comments, delete the post itself
                        axios.delete(`http://localhost:3017/api/posts/posts/${postId}`)
                            .then(() => {
                                navigate('/allpost');

                            })
                            .catch((error) => {
                                console.error('Error deleting post:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error deleting comments:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });

    };

    function handleUpdatePost() {
        navigate(`/editpost/${postId}`);
    }

    const addReplyToComment = (commentId, replyText) => {
        // Create a new reply object
        const newReply = {
            id: new Date().getTime(), // Generate a unique ID for the reply
            text: replyText,
        };

        // Update the commentReplies state
        setCommentReplies({
            ...commentReplies,
            [commentId]: [...(commentReplies[commentId] || []), newReply],
        });
    };

    const handleReplyComment = (commentId) => {
        // Display the reply textarea for the selected comment
        setEditComment({ id: commentId, text: '' });
    };

    const handleAddReply = (commentId) => {
        // Get the reply text from the state
        const replyText = editComment.text;

        // Add the reply to the comment
        addReplyToComment(commentId, replyText);

        // Clear the reply textarea
        setEditComment({ id: null, text: '' });
    };
    const generatePDF = () => {
        const doc = new jsPDF();
        const title = `Title: ${post.title}`;
        const name = `Name: ${post.name}`;
    
        // Calculate remaining space on the first page after adding title and name
        const remainingSpaceOnFirstPage = doc.internal.pageSize.height - 60; // Assuming 20 for title, 20 for name, and 20 for margins
    
        // Add title and name to the first page
        doc.text(20, 20, title);
        doc.text(20, 40, name);
    
        // Start content on the first page at 60 units from the top
        let currentYPosition = 60;
    
        // Split content into lines that fit within the width of the page
        const contentLines = doc.splitTextToSize(post.content, 180); // Adjust the width for content according to your needs
    
        // Iterate through content lines and add them to the PDF
        for (let i = 0; i < contentLines.length; i++) {
            // Check if there is enough space on the current page for the next line
            if (currentYPosition + 10 <= remainingSpaceOnFirstPage) {
                doc.text(20, currentYPosition, contentLines[i]); // Add content line to the current page
                currentYPosition += 10; // Move to the next line
            } else {
                // If there isn't enough space on the current page, start a new page
                doc.addPage();
                currentYPosition = 20; // Reset Y position for the new page
                doc.text(20, currentYPosition, contentLines[i]); // Add content line to the new page
                currentYPosition += 10; // Move to the next line
            }
        }
    
        doc.save('post.pdf'); // Save the PDF with the name 'post.pdf'
    };
    
    
    



    return (
        
        <div class="container mt-5">
          
    <div class="row">
    {/* <button className="backbutton_post" onClick={() => {navigate('/allpost')}}>back</button> */}
        <div class="col-md-8 mx-auto">
            <h1>{post.title}</h1>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{post.content}</pre>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                              by: {post.name}
                                </div>
                

            <div class="mt-4">
            {post.name === name && (
                <button class="btn btn-danger me-2" onClick={handleDeletePost}>
                    Delete Post
                </button>
                )}
                {post.name === name && (
                <button class="btn btn-primary" onClick={handleUpdatePost}>
                    Edit Post
                </button>
                 )}
            </div>

            <hr class="my-4" />

            <h2 class="mt-4">Reviews and Comments</h2>
            <button class="btn btn-secondary btn-sm ms-2" onClick={generatePDF}>
                Generate PDF
            </button>
            <hr class="my-4" />
            <div class="mt-4">
                <h3>Add a Comment</h3>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    rows="4"
                    class="form-control"
                    placeholder="Write a comment..."
                />
                <button class="btn btn-primary mt-2" onClick={handleSubmitComment}>
                    Add Comment
                </button>
            </div>
            <hr class="my-4" />

            <div class="comment-container mt-3">
                {comments.map((comment) => (
                    <div class="comment-item" key={comment._id}>
                        <p>{comment.text}</p>
                        <div class="comment-details">
                           
                            by: {comment.name}
                            {comment.name === name && (
                <button className="btn btn-link" onClick={() => handleDeleteComment(comment._id, comment.name)}>
                                Delete
                            </button>
                            )}
                            {comment.name === name && (
                            <button class="btn btn-link" onClick={() => handleEditComment(comment._id, comment.text)}>
                                Edit 
                            </button>
                             )}
                            <button class="btn btn-secondary btn-sm ms-2" onClick={() => handleReplyComment(comment._id)}>
                                Reply
                            </button>
                            <hr class="my-4" />

                            {comment._id === editComment.id && (
                                <div class="mt-3">
                                    <textarea
                                        value={editComment.text}
                                        onChange={(e) => setEditComment({ id: comment._id, text: e.target.value })}
                                        rows="4"
                                        class="form-control"
                                    />
                                    <button class="btn btn-success mt-2" onClick={() => handleUpdateComment(comment._id)}>
                                        Save
                                    </button>
                                </div>
                            )}

                            {commentReplies[comment._id] && (
                                <div class="mt-3">
                                    {commentReplies[comment._id].map((reply) => (
                                        <div key={reply.id}>
                                            <p>{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
          
        </div>
    </div>
</div>

    );

}

export default SelectedPost;