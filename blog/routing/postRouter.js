import express from 'express';
import { postHandler, fileHandler } from '../controllers/handlers.js'
import { SuccessEvent, ErrorEvent } from '../controllers/entities.js'

const router = express.Router();

// CREATE/POST new post. This post will be appended to the current posts.
router.post('/post', async (req, res) => {

})

// GET all posts. These posts can then be paginated if necessary.
router.get('/posts', async (req, res) => {

});


// GET a single post using the post's ID. 
router.get('/post/:id', async (req, res) => {

});

// EDIT/PUT a single post using the post's ID.
router.put('/post/:id', (req, res) => {

});

// DELETE a single post using the post's ID.
router.delete('/post/:id', (req, res) => {

});

// DELETE all posts.
router.delete('/posts', (req, res) => {

});

export default router;