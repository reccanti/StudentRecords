import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import routes from './routes';

// initialize the server with routes
const app = new Koa();
app.use(routes.routes())
   .use(routes.allowedMethods())
   .use(bodyParser());

export default app;