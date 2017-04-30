import * as Koa from 'koa';
import * as Router from 'koa-router';

import routes from './routes';

// initialize the server with routes
const app = new Koa();
app.use(routes.routes())
   .use(routes.allowedMethods());

export default app;