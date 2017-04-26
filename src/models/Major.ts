import client from '../database';

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
     */
    static async get(): Promise<Major[]> {
        try {
            const majorsRecords = await client.select().from('Major').then((data) => data);
            const majors = majorsRecords.map( major => {
                return new Major(major.id, major.Name);
            });
            return majors;
        } catch (err) {
            throw err;
        }
        
    }
}

export default Major;