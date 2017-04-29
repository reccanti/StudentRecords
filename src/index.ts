import '../.env';
// import createClient from './database';
import Major from './models/Major';

// const client = createClient();
Major.get({ value: 1 }).then( majors => {
    console.log(majors);
}).catch( err => { console.log(err); });