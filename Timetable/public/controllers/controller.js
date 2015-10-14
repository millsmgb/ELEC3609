//https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/430436262/iDXEYtIqEBi1XyyLc9GZi7gQosPFggDiBv9M9FS7zgI/timetable.ics

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
	var file = {path: "https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/430436262/iDXEYtIqEBi1XyyLc9GZi7gQosPFggDiBv9M9FS7zgI/timetable.ics"};
	
	console.log(file);
	
	
	
$http.post('/icaldl',file).success(function(response){ // ask server through this route
			console.log("SUCCESS , i got back a json"); // print to console
			console.log(response+"###");


		}) ;
	
	
	
	
	
	
	
	


}

	



    console.log("Hello World from controller");



	

}]);
