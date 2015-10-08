
var myApp = angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/', {
		templateUrl: 'main.html'
		});
		
	$routeProvider.when('/groups', {
		templateUrl: 'group.html'
		});
	$routeProvider.when('/upload', {
		templateUrl: 'upload.html'
		});		

}]);

myApp.controller('AppCtrl', ['$scope', '$http','$location','$rootScope', function($scope, $http, $location,$rootScope) {



$scope.processical = function(fileurl){

	console.log("The button worked");
	console.log(fileurl);
	
		$http.post('/icaldl',fileurl).success(function(response) {
			console.log("8888888888");
			console.log(response);
  });


}

	



    console.log("Hello World from controller");



	

}]);
