import '../.env';
import createClient from './database';

const client = createClient();
console.log(client);