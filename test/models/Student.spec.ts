const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

import client from '../../src/database';
import Student from '../../src/models/Student';

// initialize chai
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Student', function () {

    it ('should initialize a new Student correctly', function () {
        const student = new Student(1, 'firstname', 'lastname', 3);
        expect(student.id).to.equal(1);
        expect(student.first).to.equal('firstname');
        expect(student.last).to.equal('lastname');
        expect(student.major_id).to.equal(3);
    });

    describe('get method', function () {

        // setup the mock database for each test
        beforeEach(function () {
            client.setData([
                { id: '1', First: 'Vidit', Last: 'Organisciak', Major_id: '3' },
                { id: '2', First: 'Kenneth', Last: 'Kenny', Major_id: '3' },
                { id: '3', First: 'Ian', Last: 'Olbrich', Major_id: '4' },
                { id: '4', First: 'Joey', Last: 'LaMarca', Major_id: '4' },
                { id: '5', First: 'Nick', Last: 'Eckert', Major_id: '2' },
                { id: '6', First: 'Keila', Last: 'Oliva', Major_id: '2' },
                { id: '7', First: 'Kristen', Last: 'Beatty', Major_id: '2' },
                { id: '8', First: 'Jason', Last: 'Singhal', Major_id: '1' },
                { id: '9', First: 'Brenden', Last: 'Minnoe', Major_id: '1' },
                { id: '10', First: 'Lexi', Last: 'Greaves', Major_id: '1' },
                { id: '11', First: 'GG', Last: 'WP', Major_id: '3' }]);
            client.shouldThrowError = false;
        });

        it ('should retrieve a Promise that resolves to an array of Students', function (done) {
            const studentsPromise = Student.get();
            expect(studentsPromise).to.be.a('promise');
            studentsPromise.then(function (students) {
                expect(students).to.be.an('array');
                expect(students.length).equals(11);
                done();
            });
        });

        it ('should throw an error if it was unable to retrieve the data', function () {
            // setup the error message
            client.shouldThrowError = true;
            client.erroMessage = "test error message";

            // test the error handling
            expect(Student.get()).to.eventually.be.rejectedWith(client.errorMessage);
        });
    });

});