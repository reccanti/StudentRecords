import * as Client from 'mariasql';

const client = new Client({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    db: process.env['DB_DATABASE']
});