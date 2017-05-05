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
    export async function getById(ctx: Koa.Context, next: () => Promise<any>) {
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.id });
        if (retrievedCourses.length > 0) {
            ctx.body = retrievedCourses[0];
        } else {
            ctx.status = 404;
            ctx.message = "record not found";
        }
        await next();
    }

    /**
     * Retrieves all courses from the database
     * 
     * @param ctx - the Koa context of the middleware function
     */
    export async function getAll(ctx: Koa.Context, next: () => Promise<any>) {
        ctx.body = await Course.get();
        await next();
    }

    /**
     * Retrieves all students enrolled in the given course
     * 
     * @param ctx - the Koa context of the middleware function
     */
    export async function getEnrolledStudents(ctx: Koa.Context, next: () => Promise<any>) {
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.id });
        ctx.body = await retrievedCourses[0].getEnrolled();
        await next();
    }
}

export default CourseController;