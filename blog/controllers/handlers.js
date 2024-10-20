import { Post, Log } from './entities.js';
import Utilities from './utilities.js';
import axios from 'axios';

function parsePostFileData({data}, type = 'ParsePostFileData[]') {
    if(typeof data === 'string') {
        const parsedData = data.split('\n').filter(Boolean);
        return {type, status: 200, data: parsedData.map(post => {return JSON.parse(post)})};
    } else {
        return {type, status: 400, message: 'Data must be of type string to be parsed into JSON.'};
    }
}

export const postHandler = {
    async createPost(title, author, content, tags = []) {
        try {
            if(!title || !author || !content) 
                throw new Error('Cannot create a post without a title, author, and content.');
            if(typeof title !== 'string' || typeof author !== 'string' || typeof content !== 'string')
                throw new Error('Cannot create a post without content values being of type string.');
            const newPost = new Post(title, author, content, tags);
            return Utilities.appendFile(newPost, Utilities.getFilePath(), `CreatePost[${newPost.id}]`);
        } catch (error) {
            return {type: 'CreatePost[error]', status: 400, message: error.message};
        }
    },
    async getPosts() {

    },
    async getPost(id) {

    },
    async editPost(id) {

    },
    async deletePost(id) {

    },
    async deletePosts() {

    }
} 