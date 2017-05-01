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

/**
 * Retrieves the students enrolled in a given course
 */
courseRoutes.get('/:id/enrolledStudents', CourseController.getEnrolledStudents);

export default courseRoutes;