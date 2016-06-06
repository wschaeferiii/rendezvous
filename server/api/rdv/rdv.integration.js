'use strict';

var app = require('../..');
import request from 'supertest';

var newRdv;

describe('Rdv API:', function() {

  describe('GET /api/rdvs', function() {
    var rdvs;

    beforeEach(function(done) {
      request(app)
        .get('/api/rdvs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rdvs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rdvs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/rdvs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rdvs')
        .send({
          name: 'New Rdv',
          info: 'This is the brand new rdv!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRdv = res.body;
          done();
        });
    });

    it('should respond with the newly created rdv', function() {
      expect(newRdv.name).to.equal('New Rdv');
      expect(newRdv.info).to.equal('This is the brand new rdv!!!');
    });

  });

  describe('GET /api/rdvs/:id', function() {
    var rdv;

    beforeEach(function(done) {
      request(app)
        .get('/api/rdvs/' + newRdv._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rdv = res.body;
          done();
        });
    });

    afterEach(function() {
      rdv = {};
    });

    it('should respond with the requested rdv', function() {
      expect(rdv.name).to.equal('New Rdv');
      expect(rdv.info).to.equal('This is the brand new rdv!!!');
    });

  });

  describe('PUT /api/rdvs/:id', function() {
    var updatedRdv;

    beforeEach(function(done) {
      request(app)
        .put('/api/rdvs/' + newRdv._id)
        .send({
          name: 'Updated Rdv',
          info: 'This is the updated rdv!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRdv = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRdv = {};
    });

    it('should respond with the updated rdv', function() {
      expect(updatedRdv.name).to.equal('Updated Rdv');
      expect(updatedRdv.info).to.equal('This is the updated rdv!!!');
    });

  });

  describe('DELETE /api/rdvs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rdvs/' + newRdv._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rdv does not exist', function(done) {
      request(app)
        .delete('/api/rdvs/' + newRdv._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
