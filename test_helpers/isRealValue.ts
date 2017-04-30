const expect = require('chai').expect;

/**
 * A helper function that checks to see if a given value exists
 */
export default function isRealValue(value: any) {
    expect(value).to.not.be.null;
    expect(value).to.not.be.undefined;
}


