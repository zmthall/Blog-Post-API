import express from 'express';
import fs from 'fs';
import 'dotenv/config';

const router = express.Router();

router.get('/file/posts', async (req, res) => {
    if(req.headers.internal_api_key === process.env.INTERNAL_KEY) {
        try {
            let file = await fs.promises.readFile('./blog/files/blog.posts'); // Get the blog.posts file content as a buffer
            file = file.toString().split('\n'); // Change file from buffer to string then split the string by new line delimter
            res.status(200).json({status: 200, message: "success", data: file.map((x) => JSON.parse(x))}); // Send content of file in a json response
        } catch (err) {
            res.status(400).json({status: 400, message: err.message }) // Send a json response with the error message
        }     
    } else {
        res.status(403).json({status: 403, message: "Not authorized for access."}); // send a unauthorized access response
    }
})


export default router;