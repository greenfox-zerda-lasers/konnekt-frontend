describe('Dashboard controller', function() {

  var dashboardController;

  beforeEach(function(){

    module('konnektApp');

    inject(function($controller) {
    dashboardController = $controller('dashboardController');
    // DataHandling = $controller('DataHandling');
    });
  });

  // try test, only for test configuration ok or not
  describe('Sample tests', function () {
    it('has a dummy spec to test 2 + 2', function () {
      // An intentionally failing test. No code within expect() will never equal 4.
      expect (2 + 2).toEqual(4);
    });
  });

  // testing dashboardController 'newContact' exists
  describe('newContact exists', function() {
    it('should exist', function() {
      expect(dashboardController.newContact).toEqual('új kontakt');
    });
  });

  // testing dashboardController 'newContact' exists
  describe('allContacts exists', function() {
    it('should exist', function() {
      expect(dashboardController.allContacts).toBeDefined();
    });
  });

  // testing DataHandling.getContactData() exists
  // describe('DataHandling.getContactData() exists', function() {
  //   it('should exist', function() {
  //     expect(DataHandling.getContactData()).toBeDefined();
  //   });
  // });

});
