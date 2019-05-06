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
            .success(function (res) {
                if (res == "success") {
                    window.location.assign("http://localhost:1337/profile")
                }
            })
            .error(function (res) {
                alert(res);
                $scope.errorMessage = "Unable to login";
            });
    }

    // signup function
    function signup() {
        console.log("i made it to lowercase signup");
        buttonApi.signUp()
            .success(function (res) {
                console.log(res);
                if (res == "success") {
                    //buttonApi.profile()
                    window.location.assign("http://localhost:1337/profile")
                }
                console.log("made it to success in signup!")
            })
            .error(function (res) {
                alert(res);
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
            var email = window.document.getElementById("login-email").value;
            var password = window.document.getElementById("login-psw").value;
            var url = apiUrl + '/login' + '?email=' + email + "&password=" + password;
            //      console.log("Attempting with "+url);
            return $http.get(url); // Easy enough to do this way
        },

        // signUp function
        signUp: function () {
            console.log("i made it to uppercase signUp");
            var email = window.document.getElementById("signup-email").value;
            var password = window.document.getElementById("signup-psw").value;
            var passwordRepeat = window.document.getElementById("signup-repeat-psw").value;
            var url = apiUrl + '/signup?email=' + email + '&password=' + password + '&passwordRepeat=' + passwordRepeat;
            console.log(url);
            console.log($http);
            console.log("HEY! Youre at the bottom of button api signUp");
            return $http.get(url);
        }

    };
}