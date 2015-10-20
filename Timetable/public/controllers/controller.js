//https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/430436262/iDXEYtIqEBi1XyyLc9GZi7gQosPFggDiBv9M9FS7zgI/timetable.ics
//https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/312092938/4DKWirtoV3UpPpFRF90uCzAvjeKXvpL3eLjvi6XdXHZ/timetable.ics
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
// do not do anything if the directory is blank
if(fileurl == "" || !fileurl )
		return ;

	console.log("The button worked");
	var file = {path: fileurl}; // get the url from the input
	var timetable;
	console.log(file);
	
	// this gets back the json table from the server.
	$http.post('/icaldl',file).success(function(response){ // ask server through this route
		 timetable = JSON.parse(response);
		 $scope.times = timetable;

	}) ;
	
	


	
		
};


$scope.loadtimes = function(){
 h1 = {hour: 9, mon: "comp lecture", tues: "", wed: "", thurs: "", fri:" "};
 h2 = {hour: 10, mon: "comp lecture", tues: "elec lecture", wed: "", thurs: "", fri:" "};
 h3 = {hour: 11, mon: "", tues: "elec lecture", wed: "", thurs: "", fri:" comp tutorial"};
 h4 = {hour: 12, mon: "", tues: "", wed: "", thurs: "", fri:" comp tutorial"};

 var examplejson1 = [h1,h2,h3,h4];

 $scope.times = examplejson1;

}







    console.log("Hello World from controller");



	

}]);
