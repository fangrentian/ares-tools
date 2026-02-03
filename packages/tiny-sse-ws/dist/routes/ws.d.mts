import express_ws__default from 'express-ws';

declare const sendWsEvent: (sessionId: any, client: any, data: any) => void;
declare const router: express_ws__default.Router;

export { router as default, sendWsEvent };
