import express from 'express';
import handlers from '../controllers/handlers.js'

const router = express.Router();

router.get('/posts', async (req, res) => {
    const requestURL = new URL('file/posts', `${req.protocol}://${req.headers.host}`);
    try {
        const posts = await handlers.GetPosts(requestURL);
        res.status(200).json(posts);
    } catch(err) {
        res.status(err.status).json({status: err.status, message: err.message});
    }
})

router.get('/post/:id', async (req, res) => {
    const requestURL = new URL('file/posts', `${req.protocol}://${req.headers.host}`);
    try{
        const post = await handlers.GetPost(requestURL, req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(err.status).json({status: err.status, message: err.message});
    }
})

router.post('/post', (req, res) => {

})

router.put('/post/:id', (req, res) => {

})

router.delete('/post/:id', (req, res) => {

})

router.delete('/posts', (req, res) => {

})

export default router;