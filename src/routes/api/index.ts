import * as Router from 'koa-router';
import majorRoutes from './MajorRoutes'

const apiRoutes = new Router();

// assign all api routes
apiRoutes.use('/major', majorRoutes.routes(), majorRoutes.allowedMethods());

export default apiRoutes;