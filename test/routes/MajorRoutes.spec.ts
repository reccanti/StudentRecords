const chai = require('chai');
const request = require('supertest');
// import request from 'supertest';

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
                    expect(major.id).not.to.be.a('null');
                    expect(major.name).not.to.be.a('null');
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
                .end(function (err, res) {
                    done();
                });
        });

    });
});