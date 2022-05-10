module.factory('AuthFactory', function($rootScope, $http, $q) {

	var userInfo = {} ;

	userInfo.userRegister = function(nama,no_hp,email,password){
		return AJAXreq('POST', $rootScope.urlJSON+'api/register',{nama:nama, no_hp:no_hp, email:email, password:password});
	}

	userInfo.userLogin = function(email,password){
		return AJAXreq('POST', $rootScope.urlJSON+'api/login',{email:email, password:password});
	}

	userInfo.userLogout = function(email){
		return AJAXreq('POST', $rootScope.urlJSON+'api/logout',{email:email});
	}

	return userInfo ;	

});