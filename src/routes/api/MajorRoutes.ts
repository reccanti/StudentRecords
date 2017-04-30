import * as Router from 'koa-router';
import MajorController from '../../controllers/MajorController';

const majorRoutes = new Router();

/**
 * Retrieves all Majors from the database
 */
majorRoutes.get('/', MajorController.getAll);

/**
 * Retrieves a specific Major from the database
 */
majorRoutes.get('/:id', MajorController.getById);

export default majorRoutes;