angular.module('buttons', [])
  .controller('buttonCtrl', ButtonCtrl)
  .factory('buttonApi', buttonApi)
  .constant('apiUrl', 'http://localhost:1337'); //CHANGE for the lab!

function ButtonCtrl($scope, buttonApi) {
  $scope.buttons = []; //Initially all was still
  $scope.errorMessage = '';
  $scope.isLoading = isLoading;
  $scope.buttonClick = buttonClick;
  $scope.login = login;
  $scope.user = user;
  $scope.signup = signup;
  $scope.email = email;
  $scope.password = password;
  $scope.passwordRepeat = passwordRepeat;

  var loading = false;

  var email;
  var password;
  var passwordRepeat;
  var user;

  function isLoading() {
    return loading;
  }


  function buttonClick($event) {
    $scope.errorMessage = '';
    buttonApi.clickButton($event.target.id)
      .success(function () { })
      .error(function () {
        $scope.errorMessage = "Unable click";
      });
  }

  // login function
  function login() {
    $scope.user = window.document.getElementById("authentication-form").value;
    buttonApi.logIn($scope.user)
      .success(function () { })
      .error(function () {
        $scope.errorMessage = "Unable to login";
      });
  }

  // signup function
  function signup() {
    console.log("i made it to lowercase signup")
    buttonApi.signUp()
      .success(function (res) {
        console.log(res);
        if(res=="success"){
          //buttonApi.profile()
            window.location.assign("http://localhost:1337/profile")
        }
        console.log("made it to success in signup!")
      })
      .error(function () {
        $scope.errorMessage = "Unable to sign up!";
      });
  }


}


function buttonApi($http, apiUrl) {
  return {
    getButtons: function () {
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    // clickButton
    clickButton: function (id) {
      var url = apiUrl + '/click?id=' + id;
      //      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },

    // logIn function
    logIn: function (user) {
      var url = apiUrl + '/login' + '?user=' + user;
      //      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },

    // signUp function
    signUp: function () {
      console.log("i made it to uppercase signUp")
      email = window.document.getElementById("signup-email").value;
      password = window.document.getElementById("signup-psw").value;
      passwordRepeat = window.document.getElementById("signup-repeat-psw").value;
      var url = apiUrl + '/signup?email=' + email + '&password=' + password + '&passwordRepeat=' + passwordRepeat;
      console.log(url)
      console.log($http)
      console.log("HEY! Youre at the bottom of button api signUp")
      return $http.get(url);
    },

    profile: function () {
      var url = apiUrl +'/profile';
        return $http.get(url);
    }
  };
}