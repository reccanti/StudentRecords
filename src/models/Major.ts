import client from '../database';

/**
 * An interface that describes the different
 * parameters that can be used to search the database
 */
interface IMajorQueryParams {
    id?: string;
    name?: string;
}

/**
 * A class that represents records in the 'Major'
 * database table
 */
class Major {

    /**
     * Initializes the Major with a name and ID
     * 
     * @param id - the id of the Major in the database
     * @param name - the name of the Major in the database
     */
    constructor (public id: number, public name: string) {}

    /**
     * An async function that queries the database to get all
     * of the records associated with the given query
     * 
     * @param whereOptions - options that can be used to filter
     * the results returned by the knex client
     */
    static async get(whereOptions:IMajorQueryParams = {}): Promise<Major[]> {
        try {
            const majorsRecords = await client.select().from('Major').where(whereOptions);
            return majorsRecords.map( major => new Major(major.id, major.Name));
        } catch (err) {
            throw err;
        }
    }
}

export default Major;