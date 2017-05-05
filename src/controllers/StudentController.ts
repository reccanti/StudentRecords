import * as Koa from 'koa';
import Student from '../models/Student';
import Course from '../models/Course';

/**
 * A controller for accessing Student models
 */
namespace StudentController {

    /**
     * Get a single Student from the database
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getById(ctx: Koa.Context, next: () => Promise<any>) {
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        if (retrievedStudents.length > 0) {
            ctx.body = retrievedStudents[0];
        } else {
            ctx.status = 404;
            ctx.message = "record not found";
        }        
        await next();
    }

    /**
     * Get every Student and return it in a list
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getAll(ctx: Koa.Context, next: () => Promise<any>) {
        ctx.body = await Student.get();
        await next();
    }

    /**
     * Get a list of courses available to the given student's major
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getAvailableCourses(ctx: Koa.Context, next: () => Promise<any>) {
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        ctx.body = await retrievedStudents[0].availableCourses();
        
        await next();
    }

    /**
     * Attempts to enroll the given student in the given course
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function enrollInCourse(ctx: Koa.Context, next: () => Promise<any>) {

        // retrieve the specified courses
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.course_id });
        const student = retrievedStudents[0];
        const course = retrievedCourses[0];

        /*
         * Check to see if the student is allowed to enroll in
         * the given course. Throw a 405 response if not (Method Not
         * Allowed Error)
         */
        if (!student.canEnroll(course)) {
            ctx.status = 405;
            ctx.body = {
                message: `${course.name} does not allow students in ${student.first} ${student.last}'s major.`
            }
        }

        /*
         * Check to see if the student is already enrolled in the
         * given course. Throw a 409 response if they are (Conflict Error)
         */
        else if (course.isEnrolled(student)) {
            ctx.status = 409
            ctx.body = {
                message: `${student.first} ${student.last} is already enrolled in ${course.name}.`
            }
        }

        /*
         * Enroll the Student in the Course and return a 201 response
         * (Resource Created)
         */
        else {
            ctx.status = 201;
            ctx.body = {
                message: `${student.first} ${student.last} has been enrolled in ${course.name}!`
            }
        }

        await next();

    }
}

export default StudentController;