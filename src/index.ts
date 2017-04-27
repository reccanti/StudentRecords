import '../.env';
// import createClient from './database';
import Major from './models/Major';

// const client = createClient();
Major.get({ Value: 1 }).then( majors => {
    console.log(majors);
});