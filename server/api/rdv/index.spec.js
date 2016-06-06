'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rdvCtrlStub = {
  index: 'rdvCtrl.index',
  show: 'rdvCtrl.show',
  create: 'rdvCtrl.create',
  update: 'rdvCtrl.update',
  destroy: 'rdvCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rdvIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rdv.controller': rdvCtrlStub
});

describe('Rdv API Router:', function() {

  it('should return an express router instance', function() {
    expect(rdvIndex).to.equal(routerStub);
  });

  describe('GET /api/rdvs', function() {

    it('should route to rdv.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rdvCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/rdvs/:id', function() {

    it('should route to rdv.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rdvCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/rdvs', function() {

    it('should route to rdv.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rdvCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/rdvs/:id', function() {

    it('should route to rdv.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rdvCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rdvs/:id', function() {

    it('should route to rdv.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rdvCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rdvs/:id', function() {

    it('should route to rdv.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rdvCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
