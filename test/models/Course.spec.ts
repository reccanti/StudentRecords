const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

import client from '../../src/database';
import Course from '../../src/models/Course';

// initialize chai
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Course', function() {

    // setup the mock database
    beforeEach(function() {
        client.setData([ 
            { id: '1', Name: 'Design Patterns', Major_id: '1' },
            { id: '2', Name: 'Software Architecture', Major_id: '1' },
            { id: '3', Name: 'Rich Media', Major_id: '2' },
            { id: '4', Name: 'Data Visualization', Major_id: '2' },
            { id: '5', Name: 'Compilers', Major_id: '3' },
            { id: '6', Name: 'Data Structures', Major_id: '3' },
            { id: '7', Name: 'Web & Mobile', Major_id: '4' },
            { id: '8', Name: 'User Experience', Major_id: '4' }
        ]);
        client.shouldThrowError = false;
    });

    it('should initialize a new Course correctly', function () {
        const course = new Course(1, 'Test Course', 3);
        expect(course.id).to.equal(1, 'retrieves the correct id');
        expect(course.name).to.equal('Test Course', 'retrieves the correct course name');
        expect(course.major_id).to.equal(3, 'retrieves the correct major_id');
    });

    it('should retrieve a Promise that resolves to an array of courses', function(done) {
        const coursePromise = Course.get();
        expect(coursePromise).to.be.a('promise', 'returns a promise');
        coursePromise.then(function(courses) {
            expect(courses).to.be.an('array', 'promise resolves to an array');
            expect(courses.length).to.equal(8, 'array is of the correct size');
            done();
        })
    });

    it('should throw an error if it was unable to retrieve a course from the database', function() {

        // setup an error message
        client.shouldThrowError = true;
        client.errorMessage = "test error message";

        expect(Course.get()).to.eventually.be.rejectedWith(client.errorMessage);
    });

});