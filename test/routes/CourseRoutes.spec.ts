const chai = require('chai');
const request = require('supertest');

import isRealValue from '../../test_helpers/isRealValue';
import client from '../../src/database';
import app from '../../src/server';

const expect = chai.expect;

describe('Course Routes', function () {

    describe('getById', function () {

        it('should return a single course if it exists', function (done) {

            // setup the Client
            client.setData([ 
                { id: '1', Name: 'Design Patterns', Major_id: '1' }
            ]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/course/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    let course = res.body;
                    expect(course).to.be.an('object');
                    isRealValue(course.id);
                    isRealValue(course.name);
                    isRealValue(course.major_id);
                    done();
                });
        });

        it('should return a 404 if the course was not found', function (done) {
            
            // setup the Client
            client.setData([]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/course/1')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    done();
                });
        })
    });

    describe('getAll', function () {

        it('should return an array of all courses in the database', function (done) {
            
            // setup the Client
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

            // test the response
            request(app.listen())
                .get('/api/course')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    const courses = res.body;

                    // test that this is the correct array of data
                    expect(courses).to.be.an('array');
                    expect(courses.length).to.equal(8);

                    // test that the data in the array is well formed
                    isRealValue(courses[0].id);
                    isRealValue(courses[0].name);
                    isRealValue(courses[0].major_id);
                    done();
                });
        });

        describe('getEnrolledStudents', function() {
            it('should return an array of enrolled students', function(done) {

                // setup the database
                client.setData([
                    { 
                        Student_id: 2,
                        Courses_id: 6,
                        id: 2,
                        First: 'Kenneth',
                        Last: 'Kenny',
                        Major_id: 3 
                    },
                    { 
                        Student_id: 1,
                        Courses_id: 6,
                        id: 1,
                        First: 'Vidit',
                        Last: 'Organisciak',
                        Major_id: 3 
                    }
                ]);
                client.shouldThrowError = false;

                // test the response
                request(app.listen())
                    .get('/api/course/6/enrolledStudents')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        const students = res.body;

                        // test that this is the correct array of data
                        expect(students).to.be.an('array');
                        expect(students.length).to.equal(2);

                        // test that the data in the array is well formed
                        isRealValue(students[0].id);
                        isRealValue(students[0].first);
                        isRealValue(students[0].last);
                        isRealValue(students[0].major_id);
                        done();
                    });
            });
        });

    });
});