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

    /**
     * Get a list of courses available to the given student's major
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function getAvailableCourses(ctx: Koa.Context) {
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        ctx.body = await retrievedStudents[0].availableCourses();
    }

    /**
     * Attempts to enroll the given student in the given course
     * 
     * @param ctx - the context of the koa middleware function
     */
    export async function enrollInCourse(ctx: Koa.Context) {

        // retrieve the specified courses
        const retrievedStudents: Student[] = await Student.get({ id: ctx.params.id });
        const retrievedCourses: Course[] = await Course.get({ id: ctx.params.course_id });
        const student = retrievedStudents[0];
        const course = retrievedCourses[0];

        // test if the student is not allowed to enroll in the course
        if (!student.canEnroll(course)) {
            ctx.status = 405;
            ctx.body = {
                message: `${course.name} does not allow students in ${student.first} ${student.last}'s major`
            }
        }

        // test if the student is already enrolled in the course
        if (!course.isEnrolled(student)) {
            ctx.status = 409
        }

        // enroll the student in the course
    }
}

export default StudentController;