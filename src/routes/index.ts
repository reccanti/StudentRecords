import * as Router from 'koa-router';
import * as bodyparser from 'koa-bodyparser';
import apiRoutes from './api'

const routes = new Router();

// assign all routes
routes.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());

export default routes;