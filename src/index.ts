import '../.env';
// import createClient from './database';
import Major from './models/Major';

// const client = createClient();
Major.get().then( majors => {
    console.log(majors);
});