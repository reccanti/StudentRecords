import * as Router from 'koa-router';

import majorRoutes from './MajorRoutes';
import courseRoutes from './CourseRoutes';

const apiRoutes = new Router();

// assign all api routes
apiRoutes.use('/major', majorRoutes.routes(), majorRoutes.allowedMethods());
apiRoutes.use('/course', courseRoutes.routes(), courseRoutes.allowedMethods());

export default apiRoutes;