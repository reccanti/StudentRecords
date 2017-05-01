import * as Koa from 'koa';
import Course from '../models/Course';

/**
 * A controller for accessing Course models
 */
namespace CourseController {

    /**
     * Get a single Course by its ID
     * 
     * @param ctx - the Koa context of the middleware function
     */
    export async function getById(ctx: Koa.Context) {
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.id });
        if (retrievedCourses.length > 0) {
            ctx.body = retrievedCourses[0];
        } else {
            ctx.status = 404;
            ctx.message = "record not found";
        }
    }

    /**
     * Retrieves all courses from the database
     * 
     * @param ctx - the Koa context of the middleware function
     */
    export async function getAll(ctx: Koa.Context) {
        ctx.body = await Course.get();
    }

    /**
     * Retrieves all students enrolled in the given course
     * 
     * @param ctx - the Koa context of the middleware function
     */
    export async function getEnrolledStudents(ctx: Koa.Context) {
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.id });
        ctx.body = await retrievedCourses[0].getEnrolled();
    }
}

export default CourseController;