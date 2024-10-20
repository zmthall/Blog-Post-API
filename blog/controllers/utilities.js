import url from 'url';
import path from 'path';
import fs from 'fs/promises';

const Utilities =  {
    paginate(data, itemsPerPage = 5, currentPage = 1) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    },
    getURL(req) {
        return url.format({
            protocol: req.protocol,
            host: req.headers.host,
            pathname: req.originalURLs
        });
    },
    getFilePath(fileName = 'blog.posts') {
        return path.join(process.cwd(), `blog/files/${fileName}`);
    },
    async appendFile(data, path) {
        try {
            fs.appendFile(path, JSON.stringify(data) + '\n');
            return {status: 200, message: `Data appended to ${path}`, data};
        } catch(err) {
            return {status: err.status, message: `Data failed to be appended to ${path}`, data};
        }
    },
    async getFile(path) {

    },
    async editFile(data, path) {

    }
}

export default Utilities;