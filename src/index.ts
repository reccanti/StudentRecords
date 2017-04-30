import '../.env';
import app from './server';

// TEST
import Student from './models/Student';
Student.get({ id: 1 }).then( students => {
    console.log(students);
    return students[0].availableCourses();
}).then(courses => {
    console.log(courses);
});

app.listen(3000);