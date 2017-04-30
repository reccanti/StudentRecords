import * as Router from 'koa-router';
import CourseController from '../../controllers/CourseController';

const courseRoutes = new Router();

/**
 * Retrieves all Courses from the database
 */
courseRoutes.get('/', CourseController.getAll);

/**
 * Retrieves a specific Course form the database
 */
courseRoutes.get('/:id', CourseController.getById);

export default courseRoutes;