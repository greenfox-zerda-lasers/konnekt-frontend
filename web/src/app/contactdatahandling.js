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
        // contactData = Object.assign(contactData, successResponse.data.contacts);
        contactData = successResponse.data.contacts;
        console.log('contact data: ', contactData);
      } else {
        console.log('contact data loading error');
      }
    });
  }

  function editContactData() {
    return HttpService.editContact()
    .then(function (successResponse) {
      if (successResponse.status === 200) {
        setContactData().then(function () {
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

  // delete single contact data
  function deleteContact(sessionToken, contactId) {
    return HttpService.deleteContact(sessionToken, contactId);
  }

  return {
    getContactData: getContactData,
    setContactData: setContactData,
    editContactData: editContactData,
    deleteContact: deleteContact,
  };
}]);
