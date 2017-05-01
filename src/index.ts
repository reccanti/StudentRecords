import '../.env';
import app from './server';

// TEST
// import Course from './models/Course';
// Course.get({ id: 6 }).then( course => {
//     console.log(course);
//     return course[0].getEnrolled();
// }).then( students => {
//     console.log(students);
// });

app.listen(3000);