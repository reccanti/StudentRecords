import 'mocha';
import { expect } from 'chai';
import Major from '../../src/models/Major';

describe('Major', function() {
    it('should initialize a new Major correctly', function () {
        const major = new Major(1, 'Test Major');
        expect(major.id).to.equal(1);
        expect(major.name).to.equal('Test Major');
    });
});