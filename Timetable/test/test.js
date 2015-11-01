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
describe('Signup', function(){
 
  it('Sign up successfully', function(done) {
    user1
      .post('http://localhost:3000/signupauth')
      //using login already added on my local DB
      .send({ email: 'newuser', password: 'sarahishot' })
      .end(function(err, res) {
        res.redirects.should.eql(['http://localhost:3000/login']);
        expect(res.status).to.equal(200);
        done();
      })
;


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
  

