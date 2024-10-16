const Utilities =  {
    paginate(data, itemsPerPage = 5, currentPage = 1) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    },
    async appendPost(data) {

    },
    getIP(req) {

    },
    throwError(message) {
        throw new Error(message);
    },
    success(message) {

    }
}

export default Utilities;