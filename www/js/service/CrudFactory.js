module.factory('CrudFactory', function($rootScope, $http, $q) {

	var crud = {} ; 

	crud.makeid = function(){
	    var text = "";
	    
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 24; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;    
	}

	crud.buatPesanan = function(){
		var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));
		
		return AJAXreq(
			'POST', 
			$rootScope.urlJSON+'api/orderan',
			{
				action: 'create',
				jasa: $rootScope.jasa,
				alamat : $rootScope.alamat,
				keterangan : $rootScope.keterangan,
				waktu : $rootScope.waktu,
				token: userLoginInfo.token
			}
		);
	}

	crud.detailPesanan = function(input){
		return AJAXreq(
			'GET', 
			$rootScope.urlJSON+'api/jasa?jasa='+input
		);
	}

	return crud ;	

});	