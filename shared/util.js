const { mapValues } = require('lodash');

module.exports = {
    sendResponse
};

function sendResponse(response, responseBodies) {
    response
        .format(mapValues(
            responseBodies,
            (responseBody, mediaType) => () => response
                .type(mediaType)
                .send(responseBody)
        ));
}