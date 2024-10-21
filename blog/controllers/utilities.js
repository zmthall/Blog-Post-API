import url from 'url';
import path from 'path';
import fs from 'fs';

const Utilities =  {
    throwError(type, message, status = 400) {
        const error = new Error(message);
        error.status = status;
        error.type = type;
        throw error;
    },
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
    filterData(searchKey, searchValue, data, type = 'FindIndex[]') {
        if(Array.isArray(data)) {
            const filteredData = data.filter(item => item[searchKey] == searchValue);
            if(filteredData.length !== 0) {
                return {type, status: 200, message: `Filtered data from id[${filteredData[0].id}]`, data: filteredData[0]};
            } else this.throwError(type, 'Data does not contain search key value pair');
        } else this.throwError(type, 'Data must be of type object to find search parameter');
    },
    checkKeys(keys) {
        const requiredKeys = ['title', 'author', 'content'];

        return requiredKeys.every(rKey => {
            for(const key of keys) {
                if(key === rKey) {
                    return true;
                }
            }
            return false;
        });
    },
    file: {
        getFilePath(fileName = 'blog.posts', type = 'GetFilePath[]') {
            if(typeof fileName === 'string')
                return path.join(process.cwd(), `blog/files/${fileName}`);
            else this.throwError(type, 'FileName must be of type string to get file path')
        },
        getFileType(filePath, type = 'GetFileType[]') {
            if(typeof filePath === 'string') {
                let temp = filePath.split('.');
                return temp[temp.length - 1];
            } else this.throwError(type, 'FilePath must be of type string to get file type');
        },
        parseFileLinesToArray({data}, type = 'ParsePostFileData[]') {
            if(typeof data === 'string') {
                const parsedData = data.split('\n').filter(Boolean);
                return {type, status: 200, data: parsedData.map(post => {return JSON.parse(post)})};
            } else Utilities.throwError(type, 'Data must be of type string to be parsed into JSON');
        },
        parseToWrite({data}, type = 'ParseToWrite[]') {
            const postData = data.map(post => post.dataSTR)
            return postData.join('\n') + '\n';
        },
        async appendFile(data, filePath, type = 'AppendFile[]') {
            if(typeof data !== 'object')
                this.throwError(type, 'Data needs to be in an object type', 400);
            if(filePath.includes(process.cwd())) {
                fs.promises.appendFile(filePath, JSON.stringify(data) + '\n');
                let fileAppended = filePath.split('/')[filePath.split('/').length - 1];
                return {type, status: 200, message: `Data appended to ${fileAppended}`, data};
            } else this.throwError(type, 'Request is outside of the main directory', 403) 
        },
        async readFile(filePath, type = 'ReadFile[]') {
            if(filePath.includes(process.cwd())) {
                let fileData = await fs.promises.readFile(filePath); 
                const {data} = this.parseFileLinesToArray({data: fileData.toString()});
                const fileRead = filePath.split('/')[filePath.split('/').length - 1];
                return {type, status: 200, message: `Pulled data from ${fileRead}`, data};
            } else this.throwError(type, 'Request is outside of the main directory', 403);
        },
        async writeFile(data, filePath, type = 'WriteFile[]') {
            if(typeof data !== 'string') {
                this.throwError(type, 'Data needs to be in a string type', 400);
            }
            if(filePath.includes(process.cwd())) {
                fs.promises.writeFile(filePath, data);
                const fileWritten = filePath.split('/')[filePath.split('/').length - 1];
                return {type, status: 200, message: `Wrote data to ${fileWritten}` , data};
            } else this.throwError(type, 'Request is outside of the main directory', 403)
        }
    }
}

export default Utilities;