import * as knex from 'knex';
import MockClient from './MockClient';

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
    client = new MockClient();
}

export default client;