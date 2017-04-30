import * as Koa from 'koa';
import Student from '../models/Student';

/**
 * A controller for accessing Student models
 */
namespace StudentController {

    /**
     * Get a single Student from the database
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getById(ctx: Koa.Context) {
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        if (retrievedStudents.length > 0) {
            ctx.body = retrievedStudents[0];
        } else {
            ctx.status = 404;
            ctx.message = "record not found";
        }
    }

    /**
     * Get every Student and return it in a list
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getAll(ctx: Koa.Context) {
        ctx.body = await Student.get();
    }
}

export default StudentController;