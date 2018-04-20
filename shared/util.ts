import { isArray, mapValues } from 'lodash';
import { Response } from 'express';

export type ResponseBody = any;

export function sendResponse(response: Response, responseBodies: { [key: string]: ResponseBody }) {
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

function handleHtmlResponse(response: Response, responseBody: ResponseBody) {
    let view = responseBody;
    let locals = {};

    if (isArray(responseBody)) {
        view = responseBody[0];
        locals = responseBody[1];
    }

    response.render(view, locals);
}