angular.module('profile', [])
    .controller('profileCtrl', ProfileCtrl)
    .factory('profileApi', profileApi)
    .constant('apiUrl', 'http://localhost:1337'); //CHANGE for the lab!

function ProfileCtrl($scope, profileApi) {

    $scope.matchPerson = matchPerson;
    var loading = false;
    var firstname = "";
    var lastName = "";
    var gender;
    var dob;

    function matchPerson() {
        console.log("i made it matchPerson");
        profileApi.MatchPerson()
    }

}


function profileApi($http, apiUrl) {
    return {
        MatchPerson: function () {
            console.log("im in profile");
            firstname = window.document.getElementById("firstname").value;
            lastName = window.document.getElementById("lastname").value;
            gender = window.document.getElementsByName("gender")[0].checked;
            console.log(gender)

        }

    };
}