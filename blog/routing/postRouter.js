import express from 'express';
import { postHandler } from '../controllers/handlers.js'
import { SuccessEvent, ErrorEvent } from '../controllers/entities.js'
import Utilities from '../controllers/utilities.js';

const router = express.Router();

// CREATE/POST new post. This post will be appended to the current posts.
router.post('/post', async (req, res) => {
    console.log(await postHandler.createPost('testing title', 'testing author', 'testing content'))
})

// GET all posts. These posts can then be paginated if necessary.
router.get('/posts', async (req, res) => {

});


// GET a single post using the post's ID. 
router.get('/post/:id', async (req, res) => {

});

// EDIT/PUT a single post using the post's ID.
router.put('/post/:id', async (req, res) => {

});

// DELETE a single post using the post's ID.
router.delete('/post/:id', async (req, res) => {

});

// DELETE all posts.
router.delete('/posts', async (req, res) => {

});

export default router;