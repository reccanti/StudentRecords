/**
 * Simulates a knex client. To be used for testing
 */
export default class MockClient {

    data: object;
    constructedRecords: object[];
    shouldThrowError: boolean;
    errorMessage: "";

    /**
     * Initializes the MockClient with empty data
     */
    constructor() {
        this.data = {};
        this.constructedRecords = [];
        this.shouldThrowError = false;
    }
    
    /**
     * Set the data that the MockClient should return
     * 
     * @param data - an array of data objects that will be 
     * returned by the function. Should mirror the data
     * returned by knex
     */
    setData (data: object[]) {
        this.constructedRecords = [];
        this.data = data;
    }

    /**
     * Mocks the select function. Simply returns the client instance
     */
    select (): MockClient {
        this.constructedRecords = this.constructedRecords;
        return this;
    }

    /**
     * Mocks the from function. States that the program should
     * only return data from the given function
     */
    from (table:string): MockClient {
        this.constructedRecords = this.data[table];
        return this;
    }

    /**
     * Mocks the from function. Returns the client instance
     */
    join (): MockClient {
        return this;
    }

    /**
     * Mocks the where function. Returns a promise with the data
     * or throws an error 
     */
    where (): Promise<object[]> {
        if (this.shouldThrowError) {
            throw Error(this.errorMessage);
        } else {
            return Promise.resolve(this.constructedRecords);
        }
    }
}