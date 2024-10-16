// Create, Edit, Delete Posts (routing for different requests)

// Send blog posts on call (Paginate the posts)
import express from 'express';
import postRoutes from './routing/postRouter.js';
import fileRoute from './routing/fileRouter.js';
import 'dotenv/config';

const blog = express();
const port = process.env.PORT;

// Middleware
blog.use(express.json()) // for parsing application/json
blog.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
blog.use(fileRoute); // for routing to the blog post file
blog.use(postRoutes); // routing for the Blog Posts API

blog.get('/', (req, res) => {
    res.send('hi');
})

blog.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})