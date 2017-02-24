describe('Dashboard controller', function () {

  var ContactDataHandling;
  var dashboardController;

  beforeEach(angular.mock.module('konnektApp'));

  beforeEach(inject(function (_ContactDataHandling_) {
    ContactDataHandling = _ContactDataHandling_;
  }));

  beforeEach(inject(function ($controller) {
    dashboardController = $controller('dashboardController');
  }));

  // try test, only for test configuration ok or not
  describe('Sample tests', function () {
    it('has a dummy spec to test 2 + 2', function () {
      // An intentionally failing test. No code within expect() will never equal 4.
      expect(2 + 2).toEqual(4);
    });
  });

  // testing ContactDataHandling 'getContactData' exists
  describe('newContact exists', function () {
    it('should exist', function () {
      expect(ContactDataHandling.getContactData()).toEqual({});
    });
  });

  // testing ContactDataHandling 'getContactData' exists
  describe('getContactData gives back empty object at start', function () {
    it('should exist', function () {
      expect(ContactDataHandling.getContactData()).toEqual({});
    });
  });

  // testing dashboardController 'newContact' exists
  describe('newContacts exists', function () {
    it('should exist', function () {
      expect(dashboardController.newContact).toBeDefined();
    });
  });
});
