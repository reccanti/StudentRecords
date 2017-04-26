import * as knex from 'knex';

/**
 * A function that creates a client with our given
 * settings to connect to and access our database
 */
const client = knex({
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

export default client;