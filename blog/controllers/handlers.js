import { Post, Log } from './entities.js';
import Utilities from './utilities.js';
import axios from 'axios';

export const postHandler = {
    async createPost({title, author, content, tags = []}) {
        if(!title || !author || !content) 
            Utilities.throwError('CreatePost[error]', 'Cannot create a post without a title, author, and content', 400);
        if(typeof title !== 'string' || typeof author !== 'string' || typeof content !== 'string')
            Utilities.throwError('CreatePost[error', 'Cannot create a post without content values being of type string', 400);
        const newPost = new Post({title, author, content, tags});
        return Utilities.file.appendFile(newPost, Utilities.file.getFilePath(), `CreatePost[${newPost.id}]`);
    },
    async getPosts() {
        const posts = await Utilities.file.readFile(Utilities.file.getFilePath(), `GetPosts[all]`);
        return {type: posts.type, status: posts.status, message: posts.message, data: posts.data.map(post => new Post(post))};
    },
    async getPost(id) {
        const {data} = await this.getPosts();
        const check = data.map(post => post.id == id);
        if(check.some(Boolean)) {
            return Utilities.filterData('id', id, data.map(post => new Post(post)), `GetPost[${id}]`);
        } else Utilities.throwError(`GetPost[${id}]`, `The search parameter id[${id}] could not be found`, 400);
    },
    async editPost(id, {title = '', author = '', content = '', tags = []}) {
        const {data} = await this.getPosts();
        const check = data.map(post => post.id == id);
        if(check.some(Boolean)) {
            const newPost = new Post({title, author, content, tags, id});
            let editedPost;
            const editedPosts = data.map(post => {
                if(post.id === id) {
                    const oldPost = new Post(post);
                    editedPost = oldPost.editPost(newPost);
                    return editedPost;
                } else return new Post(post);
            });
            const {type, status, message} = await Utilities.file.writeFile(Utilities.file.parseToWrite({data: editedPosts}), Utilities.file.getFilePath(), `EditPost[${id}]`);
            return {type, status, message, data: editedPost};
        } else Utilities.throwError(`EditPost[${id}]`, `The search parameter id[${id}] could not be found`, 400);
    },
    async deletePost(id) {
        const {data} = await this.getPosts();
        const check = data.map(post => post.id == id);
        if(check.some(Boolean)) {
            let deletedPost;
            for(const idx in data) {
                if(data[idx].id === id) {
                    deletedPost = data.splice(idx, 1);
                } 
                data[idx] = new Post(data[idx]);
            }
            const {type, status} = await Utilities.file.writeFile(Utilities.file.parseToWrite({data}), Utilities.file.getFilePath(), `DeletePost[${id}]`);
            return {type, status, message: `Deleted post with id[${id}]`, data: deletedPost};
        } else Utilities.throwError(`DeletePost[${id}]`, `The search parameter id[${id}] could not be found`, 400);
    },
    async deletePosts() {
        const {data} = await this.getPosts();
        const deletedPosts = data.map(post => new Post(post));
        const {type, status} = await Utilities.file.writeFile('', Utilities.file.getFilePath(), 'DeletePosts[all]');
        return {type, status, message: `Deleted all Posts`, data: deletedPosts};
     }
} 