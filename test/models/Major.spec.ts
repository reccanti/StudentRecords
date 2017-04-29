import 'mocha';
import { expect } from 'chai';
import client from '../../src/database';
import Major from '../../src/models/Major';

describe('Major', function() {

    // setup the mock database
    beforeEach(function() {
        client.setData([ 
            { id: '1', Name: 'Software Engineering' },
            { id: '2', Name: 'New Media' },
            { id: '3', Name: 'Computer Science' },
            { id: '4', Name: 'Information Technology' },
        ]);
    });

    it('should initialize a new Major correctly', function () {
        const major = new Major(1, 'Test Major');
        expect(major.id).to.equal(1);
        expect(major.name).to.equal('Test Major');
    });

    it('should retrieve a Promise that resolves to an array of Majors', function(done) {
        const majorsPromise = Major.get();
        expect(majorsPromise).to.be.a('promise');
        majorsPromise.then(function (majors) {
            expect(majors).to.be.an('array');
            expect(majors.length).equals(4);
            done();
        });
    });
});