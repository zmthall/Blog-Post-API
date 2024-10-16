import { Post, Log, PostEvent } from './entities.js';
import Utilities from './utilities.js';
import axios from 'axios';

const handlers = {
    async GetPosts(requestURL) {
        try {
            const posts = (await axios.get(requestURL, {
                headers: {
                    'internal_api_key': process.env.INTERNAL_KEY
                }
            })).data;
            return new PostEvent('Get[All]', posts.status, posts.data);
        } catch (err) {
            return new PostEvent('Get[All]', err.status, err);
        }
    },
    async GetPost(requestURL, id) {
        try {
            let { data, status } = await this.GetPosts(requestURL);
    
            data = JSON.parse(data);
            data = data.body.filter((post) => parseInt(post.postID) === parseInt(id));
            return new PostEvent(`Get[${id}]`, status, data);
        } catch (err) {
            return new PostEvent(`Get[${id}]`, err.status, err);
        }
    }
} 

// export const CreatePost = (title, author, content) => {
//     const { post, data } = new Post(title, author, content);
    
//     return new PostEvent(`Create[${post.id}]`, status, data);
// }

// export const EditPost = (id, title = undefined, author = undefined, content = undefined) => {
//     return new PostEvent(`Edit[${id}]`, status, data);
// }

// export const DeletePost = (id) => {
//     return new PostEvent(`Delete[${id}]`, status, data);
// }

// export const DeletePosts = () => {
//     return new PostEvent('DeleteAll', status, data);
// }

export default handlers;