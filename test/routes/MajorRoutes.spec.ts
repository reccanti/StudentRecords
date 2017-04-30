const chai = require('chai');
const request = require('supertest');

import isRealValue from '../../test_helpers/isRealValue';
import client from '../../src/database';
import app from '../../src/server';

const expect = chai.expect;

describe('Major Routes', function () {

    describe('getById', function () {

        it('should return a single major if it exists', function (done) {

            // setup the Client
            client.setData([ 
                { id: '1', Name: 'Software Engineering' }
            ]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/major/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    let major = res.body;
                    expect(major).to.be.an('object');
                    isRealValue(major.id);
                    isRealValue(major.name);
                    done(); 
                });
        });

        it('should return a 404 if the major was not found', function (done) {
            
            // setup the Client
            client.setData([]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/major/1')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    done();
                });
        });

    });

    describe('getAll', function () {
        it('should return an array of all majors in the database', function (done) {

            // setup the client        
            client.setData([ 
                { id: '1', Name: 'Software Engineering' },
                { id: '2', Name: 'New Media' },
                { id: '3', Name: 'Computer Science' },
                { id: '4', Name: 'Information Technology' },
            ]);
            client.shouldThrowError = false;

            // test the response
            request(app.listen())
                .get('/api/major')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    const majors = res.body;
                    expect(majors).to.be.an('array');
                    expect(majors.length).to.equal(4);
                    isRealValue(majors[0].id);
                    isRealValue(majors[0].name);
                    done();
                });
        });
    })
});