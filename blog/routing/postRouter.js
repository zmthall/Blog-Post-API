import express from 'express';
import { postHandler } from '../controllers/handlers.js';
import { SuccessEvent, ErrorEvent } from '../controllers/entities.js';
import Utilities from '../controllers/utilities.js';
import 'dotenv/config';

const router = express.Router();

// CREATE/POST new post. This post will be appended to the current posts.
router.post('/post', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY) {
            const reqData = req.body
            const check = Utilities.checkKeys(Object.keys(reqData));
            if(check) {
                const newPost = await postHandler.createPost(reqData)
                res.status(newPost.status).json(new SuccessEvent(newPost));
            } else Utilities.throwError('POST', 'Missing data, must have a title, author, and content in the request body at the minimum', 400);
        } else Utilities.throwError('POST', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
})

// GET all posts. These posts can then be paginated if necessary.
router.get('/posts', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY) {
            const posts = await postHandler.getPosts()
            res.status(posts.status).json(new SuccessEvent(posts));
        } else Utilities.throwError('GET', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
});

// GET a single post using the post's ID. 
router.get('/post/:id', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY) {
            const post = await postHandler.getPost(req.params.id);
            res.status(post.status).json(new SuccessEvent(post));
        } else Utilities.throwError('GET', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
});

// EDIT/PUT a single post using the post's ID.
router.put('/post/:id', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY) {
            const reqData = req.body;
            const editedPost = await postHandler.editPost(parseInt(req.params.id), reqData);
            res.status(editedPost.status).json(new SuccessEvent(editedPost));
        } else Utilities.throwError('GET', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
});

// DELETE a single post using the post's ID.
router.delete('/post/:id', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY && req.headers.delete_key === process.env.DELETE_KEY) {
            const deletedPost = await postHandler.deletePost(parseInt(req.params.id));
            res.status(deletedPost.status).json(new SuccessEvent(deletedPost));
        } else Utilities.throwError('GET', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
});

// DELETE all posts.
router.delete('/posts', async (req, res) => {
    try {
        if(req.headers.api_key === process.env.API_KEY && req.headers.delete_key === process.env.DELETE_KEY) {
            const deletedPosts = await postHandler.deletePosts();
            res.status(deletedPosts.status).json(new SuccessEvent(deletedPosts));
        } else Utilities.throwError('GET', 'Authorization not allowed', 403);
    } catch (error) {
        res.status(error.status).json(new ErrorEvent(error));
    }
});

export default router;