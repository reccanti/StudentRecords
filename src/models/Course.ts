import client from '../database';
import Student from './Student';

/**
 * An interface that describes the different
 * parameters that can be used to search the database
 */
interface ICourseQueryParams {
    id?: number;
    Name?: string;
    Major_id?: number;
}

/**
 * An interface that describes the different
 * parameters that can be used to search the database
 */
interface IEnrollmentQueryParams {
    'Enrollment.Student_id'?: number;
    Student_id?: number;
    'Enrollment.Major_id'?: number;
    Major_id?: number;
}

/**
 * An interface that defines the shape of a Course object
 */
interface ICourse {
    id: number;
    name: string;
    major_id: number;
}

/**
 * A class that represents records in the 'Course'
 * database table
 */
class Course implements ICourse {

    /**
     * Initializes the Course with a name and ID
     * 
     * @param id - the id of the Course in the database
     * @param name - the name of the Course in the database
     * @param major_id - the id of the major that can enroll in this course
     */
    constructor (public id: number, public name: string, public major_id: number) {}

    /**
     * Export this data to a static JSON format that conforms
     * to the ICourse interface
     */
    toJSON(): ICourse {
        return { id: this.id, name: this.name, major_id: this.major_id }
    }

    /**
     * Get a list of students who are enrolled in the current course
     */
    async getEnrolled(whereOptions: IEnrollmentQueryParams = {}): Promise<Student[]> {
        const options = Object.assign({}, { 'Enrollment.Courses_id': this.id }, whereOptions);
        const students = await client.select()
            .from('Enrollment')
            .join('Student', { 'Enrollment.Student_id':'Student.id' })
            .where(options);
        return students.map( enrolled => {
            return new Student(enrolled.Student_id, enrolled.First, enrolled.Last, enrolled.Major_id);
        });
    }

    /**
     * Checks to see if a given student is enrolled in the course
     * 
     * @param student - The Student who we want to check is in the course
     */
    async isEnrolled(student: Student): Promise<boolean> {
        const students = await this.getEnrolled({
            'Enrollment.Student_id': student.id
        });
        return students.filter(curStudent => curStudent.id === student.id).length > 0;
    }

    /**
     * An async function that queries the database to get all
     * of the records associated with the given query
     * 
     * @param whereOptions - options that can be used to filter
     * the results returned by the knex client
     */
    static async get(whereOptions:ICourseQueryParams = {}): Promise<Course[]> {
        try {
            const courseRecords = await client.select().from('Courses').where(whereOptions);
            const courseArray = courseRecords.map( course => {
                const courseClass = new Course(course.id, course.Name, course.Major_id)
                return courseClass;
            });
            return courseArray;
        } catch (err) {
            throw err;
        }
    }
}

export default Course;