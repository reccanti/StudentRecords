import client from '../database';
import Course from './Course';

/**
 * An interface that describes the different 
 * parameters that can be used to search the database
 */
interface IStudentQueryParams {
    id?: number;
    First?: string;
    Last?: string;
    Major_id?: number; 
}

/**
 * An interface that defines the shape of the Student object
 */
interface IStudent {
    id: number;
    first: string;
    last: string;
    major_id: number;
}

/**
 * A class that represents records in the 'Student'
 * database table
 */
export default class Student implements IStudent {

    /**
     * Initializes the Major with an id, a first and last name,
     * and a major
     * 
     * @param id - the id of the Student in the database
     * @param first - the student's first name
     * @param last - the student's last name
     * @param major_id - the id of the student's major
     */
    constructor(
        public id: number,
        public first: string,
        public last: string,
        public major_id: number
    ) {}

    /**
     * Export this data to a static JSON format that conforms
     * to the IStudent interface
     */
    toJSON(): IStudent {
        return {
            id: this.id,
            first: this.first,
            last: this.last,
            major_id: this.major_id
        }
    }

    /**
     * An async function that queries the database to get all
     * of the records associated with the given query
     * 
     * @param whereOptions - options that can be used to filter
     * the results returned by the knex client
     */
    static async get(whereOptions: IStudentQueryParams = {}): Promise<Student[]> {
        try {
            const studentRecords = await client.select().from('Student').where(whereOptions);
            return studentRecords.map( student => new Student(student.id, student.First, student.Last, student.Major_id));
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get all of the courses that are available for the given 
     * student to take according to their major
     */
    async availableCourses(): Promise<Course[]> {
        try {
            return await Course.get({ Major_id: this.major_id });
        } catch (err) {
            throw err;
        }
    }
}