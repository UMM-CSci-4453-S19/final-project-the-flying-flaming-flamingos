angular.module('profile', [])
  .controller('profileCtrl', ProfileCtrl)
  .factory('profileApi', profileApi)
  .constant('apiUrl', 'http://localhost:1337'); //CHANGE for the lab!

function ProfileCtrl($scope, profileApi) {

  $scope.addToTree = addToTree;
  $scope.matchPerson = matchPerson;
  var loading = false;
  var firstname = "";
  var lastName = "";
  var gender;
  var dob;

  function matchPerson() {
    console.log("i made it matchPerson");
    profileApi.MatchPerson()
      .success(function(res) {
        console.log(res);
      })
      .error(function(res) {
        console.log(res);
      })
  }

  function addToTree() {
    console.log("i made it addToTree");
    profileApi.AddToTree()

      .success(function(res) {
        //location.assign("http://localhost:1337/registeredProfile");
      })
      .error(function(res) {
        alert(res);
      });
  }

}


function profileApi($http, apiUrl) {
  return {
    MatchPerson: function() {
      console.log("im in profile");
      firstname = window.document.getElementById("firstname").value;
      lastName = window.document.getElementById("lastname").value;
      gender = window.document.getElementsByName("gender")[0].checked;
      console.log(gender)

      if (gender) {
        gender = "Male";
      } else {
        gender = "Female";
      }

      var url = apiUrl + '/match?firstname=' + firstname + "&lastname=" + lastName + '&gender=' + gender;
      return $http.get(url);
    },

    AddToTree: function() {
      console.log("im in AddToTree");
      firstname = window.document.getElementById("firstname").value;
      lastName = window.document.getElementById("lastname").value;
      gender = window.document.getElementsByName("gender")[0].checked;
      dob = window.document.getElementById("dob").value;
      email = window.localStorage.getItem("email");
      console.log("im in AddToTree before the if for gender");

      if (gender) {
        gender = "Male";
      } else {
        gender = "Female";
      }
      console.log(firstname, lastName, gender, dob, email);

      var url = apiUrl + '/linkPerson?firstname=' + firstname + "&lastname=" + lastName + '&gender=' + gender + '&dob=' + dob + '&email=' + email;
      return $http.get(url);
    }

  };
}