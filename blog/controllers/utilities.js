import url from 'url';
import path from 'path';
import fs from 'fs';

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
    getFilePath(fileName = 'blog.posts', type = 'GetFilePath[]') {
        if(typeof fileName === 'string')
            return path.join(process.cwd(), `blog/files/${fileName}`);
        else return {type, status: 400, message: 'FileName must be of type string.'};
    },
    getFileType(filePath, type = 'GetFileType[]') {
        if(typeof filePath === 'string') {
            let temp = filePath.split('.');
            return temp[temp.length - 1];
        } else {
            return {type, status: 400, message: 'FilePath must be of type string.'};
        }
    },
    async appendFile(data, filePath, type = 'AppendFile[]') {
        try {
            if(typeof data !== 'object')
                throw new Error('Data needs to be in an object type.');
            if(filePath.includes(process.cwd())) {
                fs.promises.appendFile(filePath, JSON.stringify(data) + '\n');
                return {type, status: 200, message: `Data appended to ${filePath}`, data};
            } else {
                throw new Error(`Request is outside of the main directory.`);
            }
        } catch(error) {
            return {type, status: 400, message: error.message};
        }
    },
    async readFile(filePath, type = 'ReadFile[]') {
        try {
            if(filePath.includes(process.cwd())) {
                const data = await fs.promises.readFile(filePath); 
                return {type, status: 200, data: data.toString()};
            } else {
                throw new Error('Request is outside of the main directory.');
            }
        } catch (error) {
            return {type, status: 400, message: error.message};
        }
    },
    async writeFile(data, filePath, type = 'WriteFile[]') {
        try {
            if(typeof data !== 'string') {
                throw new Error('Data needs to be in a string type.');
            }
            if(filePath.includes(process.cwd())) {
                fs.promises.writeFile(filePath, data);
                return {type, status: 200, data};
            } else {
                throw new Error('Request is outside of the main directory.');
            }
        } catch (error) {
            return {type, status: 400, message: error.message};
        }
    }
}

export default Utilities;