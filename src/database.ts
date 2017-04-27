import * as knex from 'knex';

/**
 * Initialize our knex. This can be used reused
 * throughout the app
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