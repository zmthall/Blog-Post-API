import url from 'url';
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
    getIP(req) {

    }
}

export default Utilities;