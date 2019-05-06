angular.module('buttons', [])
  .controller('buttonCtrl', ButtonCtrl)
  .factory('buttonApi', buttonApi)
  .constant('apiUrl', 'http://localhost:1337'); //CHANGE for the lab!

function ButtonCtrl($scope, buttonApi) {
  $scope.login = login;
  $scope.signup = signup;

  // login function
  function login() {
    buttonApi.logIn($scope.user)
      .success(function(res) {
        window.localStorage.setItem("email", res);
        location.assign("http://localhost:1337/profile");
      })
      .error(function(res) {
        alert(res);
      });
  }

  // signup function
  function signup() {
    console.log("i made it to lowercase signup");
    buttonApi.signUp()
      .success(function(res) {
        window.localStorage.setItem("email", res);
        location.assign("http://localhost:1337/profile");
      })
      .error(function(res) {
        alert(res);
      });
  }
}

function buttonApi($http, apiUrl) {
  return {
    // logIn function
    logIn: function(user) {
      var email = window.document.getElementById("login-email").value;
      var password = window.document.getElementById("login-psw").value;
      var url = apiUrl + '/login' + '?email=' + email + "&password=" + password;
      return $http.get(url);
    },

    // signUp function
    signUp: function() {
      var email = window.document.getElementById("signup-email").value;
      var password = window.document.getElementById("signup-psw").value;
      var passwordRepeat = window.document.getElementById("signup-repeat-psw").value;
      var url = apiUrl + '/signup?email=' + email + '&password=' + password + '&passwordRepeat=' + passwordRepeat;
      return $http.get(url);
    }

  };
}