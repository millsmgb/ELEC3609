//https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/430436262/iDXEYtIqEBi1XyyLc9GZi7gQosPFggDiBv9M9FS7zgI/timetable.ics
//https://www.timetable.usyd.edu.au/personaltimetable/timetable/calendar/312092938/4DKWirtoV3UpPpFRF90uCzAvjeKXvpL3eLjvi6XdXHZ/timetable.ics
//testing if this will bet my name as a contributor
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


$scope.icalurl = {};
$scope.globaluser= {};




$scope.initial= function(user){
	$scope.globaluser.user = user;
console.log($scope.globaluser.user+"@##@#@@##@#@");
}

$scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post('/icalfile', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success(function(response){ // ask server through this route
	
		
		timetable = JSON.parse(response);
		
		
		var currenttable = $scope.times;

		if(currenttable == undefined){
						console.log(fileurl);

			console.log( "NOTHING EHRE");
			$scope.times = timetable;
		
		} else{ // begin comparing the current table with the new table
			console.log(fileurl);
			console.log("THERE IS A TABLE HERE");
		//	console.log(JSON.stringify(currenttable[13]));
		//	$scope.times = timetable;
		
			for(var i=0; i<currenttable.length; i++){
			
				
				// if there is a spot empty and the new table has something to put in there
				
				if(currenttable[i].mon =='' && timetable[i].mon!=''){
					currenttable[i].mon = timetable[i].mon;

				} else if(currenttable[i].mon!='' && timetable[i].mon!=''){
				
					currenttable[i].mon = (currenttable[i].mon +" || "+ timetable[i].mon);
				
				}
				if(currenttable[i].tues =='' && timetable[i].tues!=''){
					currenttable[i].tues = timetable[i].tues;

				} else if(currenttable[i].tues!='' && timetable[i].tues!=''){
				
					currenttable[i].tues = (currenttable[i].tues +" || "+ timetable[i].tues);
				
				}				
				if(currenttable[i].wed =='' && timetable[i].wed!=''){
					currenttable[i].wed = timetable[i].wed;

				} else if(currenttable[i].wed!='' && timetable[i].wed!=''){
				
					currenttable[i].wed = (currenttable[i].wed +" || "+ timetable[i].wed);
				
				}						
				if(currenttable[i].thurs =='' && timetable[i].thurs!=''){
					currenttable[i].thurs = timetable[i].thurs;

				} else if(currenttable[i].thurs!='' && timetable[i].thurs!=''){
				
					currenttable[i].thurs = (currenttable[i].thurs +" || "+ timetable[i].thurs);
				
				}	
				if(currenttable[i].fri =='' && timetable[i].fri!=''){
					currenttable[i].fri = timetable[i].fri;

				} else if(currenttable[i].fri!='' && timetable[i].fri!=''){
				
					currenttable[i].fri = (currenttable[i].fri +" || "+ timetable[i].fri);
				
				}					
			
			}
			// this updates the timetable;
			$scope.times = currenttable;
		
			
		
		
		}
		
		
		
		

	}) ;
	
    	;

};


$scope.processical = function(fileurl){
// do not do anything if the directory is blank
if(fileurl == "" || !fileurl )
		return ;

	console.log("The button worked");
	var file = {path: fileurl}; // get the url from the input
	var timetable;
	console.log(file);
	
	$scope.icalurl.txt = '';
	// this gets back the json table from the server.
	$http.post('/icaldl',file).success(function(response){ // ask server through this route
	
		
		timetable = JSON.parse(response);
		
		
		var currenttable = $scope.times;

		if(currenttable == undefined){
						console.log(fileurl);

			console.log( "NOTHING EHRE");
			$scope.times = timetable;
		
		} else{ // begin comparing the current table with the new table
			console.log(fileurl);
			console.log("THERE IS A TABLE HERE");
		//	console.log(JSON.stringify(currenttable[13]));
		//	$scope.times = timetable;
		
			for(var i=0; i<currenttable.length; i++){
			
				
				// if there is a spot empty and the new table has something to put in there
				
				if(currenttable[i].mon =='' && timetable[i].mon!=''){
					currenttable[i].mon = timetable[i].mon;

				} else if(currenttable[i].mon!='' && timetable[i].mon!=''){
				
					currenttable[i].mon = (currenttable[i].mon +" || "+ timetable[i].mon);
				
				}
				if(currenttable[i].tues =='' && timetable[i].tues!=''){
					currenttable[i].tues = timetable[i].tues;

				} else if(currenttable[i].tues!='' && timetable[i].tues!=''){
				
					currenttable[i].tues = (currenttable[i].tues +" || "+ timetable[i].tues);
				
				}				
				if(currenttable[i].wed =='' && timetable[i].wed!=''){
					currenttable[i].wed = timetable[i].wed;

				} else if(currenttable[i].wed!='' && timetable[i].wed!=''){
				
					currenttable[i].wed = (currenttable[i].wed +" || "+ timetable[i].wed);
				
				}						
				if(currenttable[i].thurs =='' && timetable[i].thurs!=''){
					currenttable[i].thurs = timetable[i].thurs;

				} else if(currenttable[i].thurs!='' && timetable[i].thurs!=''){
				
					currenttable[i].thurs = (currenttable[i].thurs +" || "+ timetable[i].thurs);
				
				}	
				if(currenttable[i].fri =='' && timetable[i].fri!=''){
					currenttable[i].fri = timetable[i].fri;

				} else if(currenttable[i].fri!='' && timetable[i].fri!=''){
				
					currenttable[i].fri = (currenttable[i].fri +" || "+ timetable[i].fri);
				
				}					
			
			}
			// this updates the timetable;
			$scope.times = currenttable;
		
			
		
		
		}
		
		
		
		

	}) ;
	
	


	
		
};

$scope.set_color = function(time){
	// check if the field contains the || symbol showing there is a clash
	
	var str =  time;
	if(str.indexOf('||') !== -1)
		return { 'background-color': "red",
				'color': "white"
				};


}








    console.log("Hello World from controller");



	

}]);
