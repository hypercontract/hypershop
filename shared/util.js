const { isArray, mapValues } = require('lodash');

module.exports = {
    sendResponse
};

function sendResponse(response, responseBodies) {
    response
        .format(mapValues(
            responseBodies,
            (responseBody, mediaType) => () => {
                if (mediaType === 'html') {
                    handleHtmlResponse(response, responseBody);
                } else {
                    response
                        .type(mediaType)
                        .send(responseBody);
                }
            }
        ));
}

function handleHtmlResponse(response, responseBody) {
    let view = responseBody;
    let locals = {};

    if (isArray(responseBody)) {
        view = responseBody[0];
        locals = responseBody[1];
    }

    response.render(view, locals);
}