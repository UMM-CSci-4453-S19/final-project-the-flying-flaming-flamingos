angular.module('buttons', [])
  .controller('buttonCtrl', ButtonCtrl)
  .factory('buttonApi', buttonApi)
  .constant('apiUrl', 'http://146.57.34.125:1337'); //CHANGE for the lab!

function ButtonCtrl($scope, buttonApi) {
  $scope.buttons = []; //Initially all was still
  $scope.errorMessage = '';
  $scope.isLoading = isLoading;
  $scope.refreshButtons = refreshButtons;
  $scope.buttonClick = buttonClick;
  $scope.login = login;
  $scope.user = user;

  var loading = false;

  function isLoading() {
    return loading;
  }

  function refreshButtons() {
    loading = true;
    $scope.errorMessage = '';
    buttonApi.getButtons()
      .success(function(data) {
        $scope.buttons = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to load Buttons:  Database request failed";
        loading = false;
      });
  }

  function buttonClick($event) {
    $scope.errorMessage = '';
    buttonApi.clickButton($event.target.id)
      .success(function() {})
      .error(function() {
        $scope.errorMessage = "Unable click";
      });
  }
  refreshButtons(); //make sure the buttons are loaded

  // login function
  function login() {
    $scope.user = window.document.getElementById("authentication-form").value;
    buttonApi.logIn($scope.user)
      .sucess(function() {})
      .error(function() {
        $scope.errorMessage = "Unable to login";
      });
  }

  // signUp function
  function signUp() {

  }

}

function buttonApi($http, apiUrl) {
  return {
    getButtons: function() {
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    clickButton: function(id) {
      var url = apiUrl + '/click?id=' + id;
      //      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },

    // login function
    logIn: function(user) {
      var url = apiUrl + '/login' + '?user=' + user;
      //      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    }

  };
}

// function login() {
//     var user = window.document.getElementById("authentication-form").value;
//     buttonApi.logIn(user)
//         .sucess(function() {})
//         .error(function() {
//             $scope.errorMessage = "Unable to login";
//         });
// }