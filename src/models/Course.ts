import client from '../database';

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
        return { id: this.id, name: this.name, major_id: this.id }
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
            return courseRecords.map( course => new Course(course.id, course.Name, course.major_id));
        } catch (err) {
            throw err;
        }
    }
}

export default Course;