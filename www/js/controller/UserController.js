module.controller('UserController', ['$scope', '$rootScope', '$http', 'AuthFactory', function($scope, $rootScope, $http, AuthFactory) {            

	$scope.register = function(user){
		if(user.nama == null || user.nama == ""  , 
			user.no_hp == null || user.no_hp == ""  , 
				user.email == null || user.email == ""  , 
					user.password == null || user.password == "" ){

			ons.notification.alert({message: "Jangan ada yang kosong formnya", title: "Peringatan!"});

		}
		else{

			if(user.email != undefined){
				//alert(user.no_hp);
				registerVal = AuthFactory.userRegister(user.nama,user.no_hp,user.email,user.password);

				if(registerVal.status == 'success'){
					ons.notification.alert({
						message : 'Terima kasih Anda sudah melakukan pendaftaran. Silahkan cek email Anda, lakukan verifikasi',
						title: 'Berhasil!',
						callback: function(){
							app.user.popPage();
						}

					});
				}
				else{
					ons.notification.alert({
						message: registerVal.message,
						title: 'Peringatan!!'
					});
				}
			}
			else{
					ons.notification.alert({
						message: 'Tolong diperbaiki alamat email, karena masih salah!',
						title: 'Peringatan!!'
					});
			}
		}
	}

	$scope.login = function(user){

		var loginVal = AuthFactory.userLogin(user.email,user.password);

		if (loginVal.status == 'success') {
			var userInfo = {
				email : loginVal.email,
				token : loginVal.token,
				login_name : loginVal.login_name
			}

			window.localStorage.setItem("userInfo",JSON.stringify(userInfo));

			app.user.resetToPage('user.html', {animation: 'slide'});
			app.tabbar.setTabbarVisibility(true);

			$scope.userInit();
		}
		else{
			ons.notification.alert("Email atau Password anda salah, silahkan coba lagi!");
		}
	}

	$scope.logout = function(){
		var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));

		ons.notification.confirm({
			message: 'Apakah anda akan logout?',
			callback: function(idx){
				switch(idx){
					case 0 : break;
					case 1 : 
						var logoutVal = AuthFactory.userLogout(userLoginInfo.email);

						if (logoutVal.status == 'success') {
							userInfo = null;
							window.localStorage.setItem("userInfo", userInfo);

							app.user.resetToPage('login.html', {animation: 'slide'});
							app.tabbar.setTabbarVisibility(false);

						}
						else{
							ons.notification.alert({
								title: 'Peringatan',
								message: 'Koneksi Bermasalah'
							});
						}
				}
			}
		});
	}

}]);

