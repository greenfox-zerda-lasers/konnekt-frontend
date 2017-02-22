'use strict';

const konnektApp = angular.module('konnektApp');

konnektApp.factory('ContactDataHandling', ['HttpService', '$window', function (HttpService, $window) {

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

  function editContactData(sessionToken, userData) {
    return HttpService.editContact(sessionToken, userData)
    .then(function (successResponse) {
      if (successResponse.status === 200) {
        setContactData(sessionToken).then(function () {
          $window.location.href = '#!/dashboard';
        });
      } else {
        console.log('edit data error');
      }
    }, function (errorResponse) {
      if (errorResponse.status === 401) {
        console.log('ERROR: 401 status from server');
        // UserService.logoutUser();
        $window.location.href = '#!/login';
        // UserService.userData.errormessage = errorResponse.data.errors[0].name + ' : ' + errorResponse.data.errors[0].message;
        // console.log(userData);
      } else {
        console.log('ERROR: no data from server');
        // UserService.logoutUser();
        $window.location.href = '#!/login';
      }
    });
  }

  return {
    getContactData: getContactData,
    setContactData: setContactData,
    editContactData: editContactData
  };
}]);
