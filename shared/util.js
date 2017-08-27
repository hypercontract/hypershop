const { mapValues } = require('lodash');

module.exports = {
    sendResponse
};

function sendResponse(response, responseBodies) {
    response
        .format(mapValues(
            responseBodies,
            responseBody => () => response.send(responseBody)
        ));
}