// import * as Koa from 'koa';
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// import client from '../../src/database';
// import MajorController from '../../src/controllers/MajorController';

// // initialize chai
// chai.use(chaiAsPromised);
// const expect = chai.expect;

// describe('MajorController', function() {
    
//     describe('GetById', function() {

//         beforeEach(function() {
//             client.setData([ 
//                 { id: '1', Name: 'Software Engineering' }
//             ]);
//             client.shouldThrowError = false;
//         });

//         it('should be a single major', function (done) {
//             const major = MajorController.getById(ctx).then(function() {
//                 done();
//             });
//         });
//     });

//     describe('getAll', function() {

//     });
// });