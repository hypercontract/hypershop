module.exports = {
    getBaseUri,
    getRootPath,
    getRootUri
};

function getBaseUri() {
    return '';
}

function getRootPath() {
    return '/';
}

function getRootUri() {
    return getBaseUri() + getRootPath();
}
