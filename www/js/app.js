var module = angular.module('app', ['onsen']);

module.run(function($rootScope){

	$rootScope.urlJSON = 'http://ws.jarvisid.com/index.php/';
	$rootScope.product_id;
	$rootScope.time;
	$rootScope.location;

});