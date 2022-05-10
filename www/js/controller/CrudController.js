module.controller('CrudController', ['$scope', '$rootScope', '$http', '$sce', 'CrudFactory', function($scope, $rootScope, $http, $sce, CrudFactory) {            
    
    /* **************************************** */
    /* ************ ini untuk crud ************ */
    /* **************************************** */

    $scope.latKota = new google.maps.LatLng(-6.9009828,109.6817865);

    $scope.isiSelanjutnya = function(page,input,inputlagi,act){
    	var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (userLoginInfo != null) {
        	switch(page){
        		case "jasa" :
                    //alert(input);
        			if (input != null && input !="" && input != undefined) {
        				var jasaVal = CrudFactory.detailPesanan(input);
                        $rootScope.jasa = input;
                        //$rootScope.nama_jasa = jasaInfo.name;
                        //alert($rootScope.jasa);
        				app.tambah.pushPage("order_view/alamat.html", {animation: 'slide'});
        			}
        			else{
        				ons.notification.alert({
        					message: 'Tidak ada yang dipilih!',
        					title: 'Peringatan!'
        				});
        			}
        			break;

                case "alamat" :
                    if (input != null && input !="" && input != undefined) {
                        $rootScope.alamat = input;
                        $rootScope.keterangan = inputlagi;
                        //alert($rootScope.alamat);
                        app.tambah.pushPage("order_view/waktu.html", {animation: 'slide'});
                    }
                    else{
                        ons.notification.alert({
                            message: 'Alamat tidak boleh kosong, Mohon di isi!',
                            title: 'Peringatan!'
                        });
                    }
                    break;

                case "waktu" :
                    if (input != null && input !="" && input != undefined) {
                        $rootScope.waktu = input;
                        app.tambah.pushPage("order_view/lengkap.html", {animation: 'slide'});
                    }
                    else{
                        ons.notification.alert({
                            message: 'Waku tidak boleh kosong, Mohon di isi!',
                            title: 'Peringatan!'
                        });
                    }
                    break;

        		default: break;
        	}
        }
        else{
            app.tabbar.setActiveTab(3);
            app.tambah.pushPage('login.html', {animation: 'slide'});
        }
    }

    $scope.halInfoFinish = function(act){
        ons.notification.confirm({
            title: 'Konfirmasi Pesanan Anda',
            message : 'Lanjutkan dan cari teknisi?',
            callback: function(idx){
                switch(idx){
                    case 0:
                        break;
                    case 1:
                        if (act == 'create'){
                            var tambahVal = CrudFactory.buatPesanan();
                            if (tambahVal.status == 'success'){
                                ons.notification.alert({
                                    title: 'Pesanan Berhasil',
                                    message : 'Kami akan mencarikan penyedia jasa yang tepat untuk anda'
                                });
                            }
                            else{
                                ons.notification.alert({
                                    title: 'Pesanan Gagal',
                                    message : 'Maaf saat ini sedang tidak dapat membuat pesanan baru'
                                });
                            }

                            //app.pesanan.popPage();
                            app.tambah.resetToPage('home.html',{animation:'slide'});
                            app.tabbar.setTabbarVisibility(true);
                        }

                        $scope.pesananInit(true);

                        app.tabbar.setActiveTab(1);
                        $rootScope.jasa       = null;
                        $rootScope.waktu      = null;
                        $rootScope.alamat     = null;
                        $rootScope.keterangan = null;
                }
            }
        });
    }

    $scope.aturWaktu = function(x){
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {

            if (x == 'tanggal') {
                var myDate = new Date();

                cordova.plugins.DateTimePicker.show({
                    mode: "datetime",
                    date: myDate,
                    allowOldDates: true,
                    allowFutureDates: true,
                    minDate: new Date(),
                    maxDate: null,
                    minuteInterval: 15,
                    locale: "EN",
                    okText: "Pilih",
                    cancelText: "Cancel",
                    android: {
                        theme: 16974126, // Theme_DeviceDefault_Dialog
                        calendar: false,
                        is24HourView: true
                    },
                    success: function(newDate) {
                        // Handle new date.
                        //console.info(newDate);
                        //alert(newDate);
                        document.getElementById('tgl').value = newDate;
                        myDate = newDate;
                    },
                    cancel: function() {
                        console.info("Cancelled");
                    },
                    error: function (err) {
                        // Handle error.
                        console.error(err);
                    }
                });
            }

        }
    }

    $scope.mapsInit = function(){

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {

        }
        var mapOptions = {
            zoom: 11,
            center: $scope.latKota,
            mapTypeId: 'roadmap'
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    }

    $scope.getPosition = function(){
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
           var options = {maximumAge: 60000, timeout: 30000, enableHighAccuracy: true};
            navigator.geolocation.getCurrentPosition(

                function(position){

                    var mapOptions = {
                        zoom: 16,
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);                                    
                    var markerOptions = {
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: $scope.map,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    };

                    var marker;
                    marker = new google.maps.Marker(markerOptions);
                    markers.push(marker); 

                }, 

                function(error){
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
                }, 

            options); 
        }
    }

}]);

