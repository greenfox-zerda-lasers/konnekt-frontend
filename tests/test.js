describe('Dashboard controller', function () {

  var ContactDataHandling;
  var UserService;
  var dashboardController;

  beforeEach(angular.mock.module('konnektApp'));

  beforeEach(inject(function (_ContactDataHandling_, _UserService_) {
    ContactDataHandling = _ContactDataHandling_;
    UserService = _UserService_;
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
  describe('getContactData testing', function () {

    it('gives back empty object at start exist', function () {
      expect(ContactDataHandling.getContactData()).toEqual({});
    });

    it('setContactData should exist', function () {
      expect(ContactDataHandling.setContactData('sessiontoken')).toBeDefined();
    });

    it('editContactData shoult exist', function () {
      expect(ContactDataHandling.editContactData()).toBeDefined();
    });

    it('deleteContact should exist', function () {
      expect(ContactDataHandling.deleteContact()).toBeDefined();
    });
  });


  // testing ContactDataHandling 'getContactData' exists
  describe('UserService testing', function () {

    it('login function should exist', function () {
      expect(UserService.login()).toBeDefined();
    });

    it('isLoggedIn should exist', function () {
      expect(UserService.isLoggedIn()).toBeDefined();
    });

    it('getUserData function should exist', function () {
      expect(UserService.getUserData()).toBeDefined();
    });

    it('getUserLocalStorage shoult exist', function () {
      expect(UserService.getUserLocalStorage()).toBeDefined();
    });
  });


  // testing dashboardController 'newContact' exists
  describe('newContacts exists', function () {
    it('should exist', function () {
      expect(dashboardController.newContact).toBeDefined();
    });
  });
});
