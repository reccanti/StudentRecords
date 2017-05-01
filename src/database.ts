import * as knex from 'knex';

let client;

// use a normal database if not in testing mode
if (process.env['NODE_ENV'] != 'TEST') {

    /**
     * Initialize our knex. This can be used reused
     * throughout the app
     */
    client = knex({
        dialect: 'mariadb',
        connection: {        
            host: process.env['DB_HOST'],
            user: process.env['DB_USER'],
            password: process.env['DB_PASSWORD'],
            db: process.env['DB_DATABASE'],
            port: process.env['DB_PORT'],
            charset: 'utf8'
        }
    });
} 

// setup a mock database for testing
else {

    /**
     * Simulates a knex client. To be used for testing
     */
    class MockClient {

        data: object[];
        shouldThrowError: boolean;
        errorMessage: "";

        /**
         * Initializes the MockClient with empty data
         */
        constructor() {
            this.data = [];
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
            this.data = data;
        }

        /**
         * Mocks the select function. Simply returns the client instance
         */
        select (): MockClient {
            return this;
        }

        /**
         * Mocks the from function. Simply returns the client instance
         */
        from (): MockClient {
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
                return Promise.resolve(this.data);
            }
        }


    }
    client = new MockClient();
}

export default client;