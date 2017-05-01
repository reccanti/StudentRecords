const chai = require('chai');
const request = require('supertest');

import isRealValue from '../../test_helpers/isRealValue';
import client from '../../src/database';
import app from '../../src/server';

const expect = chai.expect;

describe('Student Routes', function () {

    describe('getById', function () {

        it('should return a single student if it exists', function (done) {

            // setup the Client
            client.setData([
                { id: '1', First: 'Vidit', Last: 'Organisciak', Major_id: '3' }
            ]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/student/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    let student = res.body;
                    expect(student).to.be.an('object');
                    isRealValue(student.id);
                    isRealValue(student.first);
                    isRealValue(student.last);
                    isRealValue(student.major_id);
                    done();
                });
        });

        it('should return a 404 if the student was not found', function (done) {
            
            // // setup the Client
            client.setData([]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/student/1')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    done();
                });
        });

    });

    describe('getAll', function () {
        it('should return an array of all students in the database', function (done) {

            // setup the client
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

            // test the response
            request(app.listen())
                .get('/api/student')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    const students = res.body;

                    // test that the correct array was returned
                    expect(students).to.be.an('array');
                    expect(students.length).to.equal(11);

                    // test that the type of data is well-formed
                    isRealValue(students[0].id);
                    isRealValue(students[0].first);
                    isRealValue(students[0].last);
                    isRealValue(students[0].major_id);
                    done()
                });
        });

        describe('getAvailableCourses', function () {
            it('should return an array of all courses available to the given student', function (done) {
                
                // setup the database
                client.setData([
                    { id: '5', Name: 'Compilers', Major_id: '3' },
                    { id: '6', Name: 'Data Structures', Major_id: '3' }
                ]);
                client.shouldThrowError = false;

                request(app.listen())
                    .get('/api/student/1/availableCourses')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        const courses = res.body;

                        // test that the correct array was returned
                        expect(courses).to.be.an('array');
                        expect(courses.length).to.equal(2);

                        // test that the type of data is well-formed
                        isRealValue(courses[0].id);
                        isRealValue(courses[0].name);
                        done();
                    });
            });
        });
    })
});