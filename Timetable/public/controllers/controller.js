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


$scope.loadtimes = function(){
 h1 = {hour: 9, mon: "comp lecture", tues: "", wed: "", thurs: "", fri:" "};
 h2 = {hour: 10, mon: "comp lecture", tues: "elec lecture", wed: "", thurs: "", fri:" "};
 h3 = {hour: 11, mon: "", tues: "elec lecture", wed: "", thurs: "", fri:" comp tutorial"};
 h4 = {hour: 12, mon: "", tues: "", wed: "", thurs: "", fri:" comp tutorial"};

 var examplejson1 = [h1,h2,h3,h4];

 $scope.times = examplejson1;

}



var comparetimes = function(time){

	



}








    console.log("Hello World from controller");



	

}]);
