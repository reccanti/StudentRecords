import * as Router from 'koa-router';
import StudentController from '../../controllers/StudentController';

const studentRoutes = new Router();

/**
 * Retrieves all Students from the database
 */
studentRoutes.get('/', StudentController.getAll);

/**
 * Retrieves a specific Student from the database
 */
studentRoutes.get('/:id', StudentController.getById);

/**
 * Retrieves the courses available to the specific major
 */
studentRoutes.get('/:id/availableCourses', StudentController.getAvailableCourses);

/**
 * Attempt to enroll a student in a given course
 */
studentRoutes.post('/enroll/', StudentController.enrollInCourse);

export default studentRoutes;