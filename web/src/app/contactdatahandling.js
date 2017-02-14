'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.factory('ContactDataHandling', ['HttpService', function (HttpService) {

    var contactData = {};

    // returns stored contact info
    function getContactData() {
      return contactData;
    }

    // read contact info from server
    function setContactData(sessionToken) {
      return HttpService.getAllContacts(sessionToken)
      .then(function (successResponse) {
        if (successResponse.status === 200) {
          contactData = Object.assign(contactData, successResponse.data.contacts);
        } else {
          console.log('contact data loading error');
        }
      });
    }

    return {
      getContactData: getContactData,
      setContactData: setContactData,
    };
  }]);
})();
