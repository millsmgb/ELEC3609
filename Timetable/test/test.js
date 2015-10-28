//var assert = require("assert");
var express = require('express');
var superagent = require("superagent");
var assert = require('chai').assert;
var expect = require('expect.js');
var should = require('should');
//var ngMock = require('ngMock');
//var angular = require("angular");
var app = express();

var user1 = superagent.agent();


describe('Cannot GET', function() {
  
  it('Should give 404 on a bad link', function(done) {
    superagent
      .get('http://localhost:3000/wat')
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
      });


  });
});


describe('Login', function() {
  
  it('Redirect to index after login', function(done) {
    user1
      .post('http://localhost:3000/login')
      //using login already added on my local DB
      .send({ email: 'hello@hi.com', password: 'hello' })
      .end(function(err, res) {
        res.redirects.should.eql(['http://localhost:3000/index']);
        expect(res.status).to.equal(200);
        done();
      })
;

  });

  it('Redirect back to login on failed authentication', function(done){
   user1
      .post('http://localhost:3000/login')

      .send({ email: 'hello@hi.com', password: 'wrongk' })
      .end(function(err, res) {
        res.redirects.should.eql(['http://localhost:3000/login']);
        expect(res.status).to.equal(200);
        done();
      });


  });
});

describe('Logout', function(){

 // beforeEach(module('myApp'));
before(function() {
    user1
    .post('http://localhost:3000/login')
    .send({ email: 'hello@hi.com', password: 'hello' })
    .end(function(err, res){
      });
    // runs before all tests in this block
  });

  it('Logged out successfully',function(done){
   
   user1
      .get('http://localhost:3000/logout')
      .end(function(err, res){
         res.redirects.should.eql([]);
        expect(res.status).to.equal(200);
        done();
    });
  });
});

describe('homepage', function(){
 // beforeEach(module('myApp'));

  it('Respond to GET',function(done){
   
    superagent
      .get('http://localhost:3000')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });
});
  
describe('comments', function(){
  //login so we can actually post comments

  it('Respond to comment post to /create3DUserInterface',function(done){
       user1

        .post('http://localhost:3000/login')
        .send({ email: 'hello@hi.com', password: 'hello' })
        .end(function(err, res){
             res.redirects.should.eql(['http://localhost:3000/index']);

             user1
              .get('http://localhost:3000/')
              .end(function(err,res){

  
              user1

                .get('http://localhost:3000/postsrouter')
                .end(function(err, res){

                      user1
                        //posting comment on specific page, can check on local website
                        .post('http://localhost:3000/postsrouter')
                        .send({comment: 'hello', upvotes: 0 , author: 'hello@hi.com' , location: '/create3DUserInterface'})
                        .end(function(err, res){
                           expect(res.status).to.equal(200);
                          done();
                        });
                });
              });
          });

  });

  it('Successfully remove comment from id taken from DB',function(done){
     user1
      //login first
        .post('http://localhost:3000/login')
        .send({ email: 'hello@hi.com', password: 'hello' })
        .end(function(err, res){
             res.redirects.should.eql(['http://localhost:3000/index']);

             user1
              .get('http://localhost:3000/')
              .end(function(err,res){

  
              user1

                .get('http://localhost:3000/postsrouter')
                .end(function(err, res){

                      user1
                        //delete comment, place ID from mongo: use easy, db.posts.find(), grab any ObjectId and paste into postsrouter/x
                        .del('http://localhost:3000/postsrouter/56243b4315f8c7801de3f3e0')

                        .end(function(err, res){
                          //200 if correct
                          expect(res.status).to.equal(200);
                          done();
                        });
                });
              });
          });

  });

});

