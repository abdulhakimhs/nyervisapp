module.controller('AppController', ['$scope', '$rootScope', '$http', '$sce', '$timeout', function($scope, $rootScope, $http, $sce, $timeout) {

    $scope.kategori = [];
    $scope.product  = [];
    $scope.pesanan  = [];
    $scope.userProfile = [];
    $scope.dataDetail = [];

    $scope.isSubmitting = false;

    $scope.kategoriInit = function(){
        var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (userLoginInfo == null) {
            app.tabbar.setActiveTab(3);
            app.tabbar.setTabbarVisibility(false);
            app.user.pushPage('login.html', {animation: 'slide'});
        }
        else{
            app.modal.show();

            $http({
                method: 'GET',
                headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                url : $rootScope.urlJSON+'api/all_service'

            }).then(function successCallback(response){
                $scope.kategori = [];

                for(i=0; i < response.data.length; i=i+1){
                    $scope.kategori.push(response.data[i]);
                    //alert(response.data[i].category_name);
                }

                app.modal.hide();
            }, function errorCallback(response){
                alert("Sesi Login Habis, silahkan login lagi!");
                app.modal.hide();

            });
        }
    }

    $scope.kategoriDelegate = {
      configureItemScope: function(index, itemScope) {
        itemScope.category_id = $scope.kategori[index].service_id;
        itemScope.category_name = $scope.kategori[index].service_name;
        itemScope.category_desc = $scope.kategori[index].service_desc;
        itemScope.category_image = $scope.kategori[index].service_image;
      },
      countItems: function() {
        return $scope.kategori.length;
      },
      calculateItemHeight: function() {
        return 100;
      }
    };

    $scope.pullNewHome = function($done){
        $timeout(function(){

            $http({
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                },
                url : $rootScope.urlJSON+'api/all_service'

            }).then(function successCallback(response){
                $scope.kategori = [];

                for(i=0; i < response.data.length; i=i+1){
                    $scope.kategori.push(response.data[i]);
                    //alert(response.data[i].category_name);
                }

                $scope.kategoriDelegate.refresh();

                app.modal.hide();
            }, function errorCallback(response){
                alert("Sesi Login Habis, silahkan login lagi!");
                app.modal.hide();

            });

            $done;

        },1000);
    }

    $scope.productService = function(category_id){
        app.tabbar.setTabbarVisibility(false);
        app.home.pushPage('order_view/tambah.html',{animation:'slide'});

        $scope.id = category_id;

        $http({
            method: 'GET',
            headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                },
            url : $rootScope.urlJSON+'api/product?id='+category_id

        }).then(function successCallback(response){
            $scope.product = [];

            for(i=0; i < response.data.length; i=i+1){
                $scope.product.push(response.data[i]);
                //alert(response.data[i].category_name);
            }

            app.modal.hide();
        }, function errorCallback(response){
            alert("Sesi Login Habis, silahkan login lagi!");
            app.modal.hide();

        });
    }

    $scope.productDelegate = {
      configureItemScope: function(index, itemScope) {
        itemScope.id_product    = $scope.product[index].product_id;
        itemScope.name_product  = $scope.product[index].product_name;
        itemScope.desc_product  = $scope.product[index].product_desc;
        itemScope.price_product = $scope.product[index].product_price;
        itemScope.image_product = $scope.product[index].product_image;
      },
      countItems: function() {
        return $scope.product.length;
      },
      calculateItemHeight: function() {
        return 100;
      }
    };

    $scope.userInit = function(){
        var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (userLoginInfo == null) {
            app.tabbar.setActiveTab(3);
            app.tabbar.setTabbarVisibility(false);
            app.user.pushPage('login.html', {animation: 'slide'});
        }
        else{
            app.modal.show();
            $http({
                method: 'GET',
                headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                url : $rootScope.urlJSON+'api/profile_user?token='+userLoginInfo.token

            }).then(function successCallback(response){
                $scope.userProfile = [];

                for(i=0; i < response.data.length; i=i+1){
                    $scope.userProfile.push(response.data[i]);
                }

                app.modal.hide();
            }, function errorCallback(response){
                alert("Sesi Login Habis, silahkan login lagi!");
                app.modal.hide();

            });
        }
    }

    $scope.userprofileDelegate = {
      configureItemScope: function(index, itemScope) {
        itemScope.namanya    = $scope.userProfile[index].fullname;
        itemScope.emailnya  = $scope.userProfile[index].email;
        itemScope.saldonya  = $scope.userProfile[index].balance;
        itemScope.nomer_hp  = $scope.userProfile[index].handphone;
      },
      countItems: function() {
        return $scope.userProfile.length;
      },
      calculateItemHeight: function() {
        return 100;
      }
    };

    $scope.pesananDetail = function(id_pesanan){
        app.tabbar.setTabbarVisibility(false);
        app.pesanan.pushPage('detail_pesanan.html',{animation:'slide'});

        $scope.id = id_pesanan;

        $http({
            method: 'GET',
            headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                },
            url : $rootScope.urlJSON+'api/detail_pesanan?id='+id_pesanan

        }).then(function successCallback(response){
            $scope.dataDetail = [];

            for(i=0; i < response.data.length; i=i+1){
                $scope.dataDetail.push(response.data[i]);
                //alert(response.data[i].transaction_id);
            }

            app.modal.hide();
        }, function errorCallback(response){
            alert("Sesi Login Habis, silahkan login lagi!");
            app.modal.hide();

        });
    }

    $scope.detailDelegate = {
      configureItemScope: function(index, itemScope) {
        itemScope.tess = $scope.dataDetail[index].transaction_id;
      },
      countItems: function() {
        return $scope.dataDetail.length;
      },
      calculateItemHeight: function() {
        return 100;
      }
    };

    // $scope.dataDetailPesananDelegate = {
    //   configureItemScope: function(index, itemScope) {
    //     itemScope.id_transaksi  = $scope.dataDetailPesanan[index].transaction_id;
    //     itemScope.produknya     = $scope.dataDetailPesanan[index].product_name;
    //     itemScope.statusnya     = $scope.dataDetailPesanan[index].transaction_status;
    //     //itemScope.teknisnya     = $scope.dataDetailPesanan[index].;
    //     itemScope.tgl_jadwal    = $scope.dataDetailPesanan[index].date_schedule;
    //     itemScope.jam_jadwal    = $scope.dataDetailPesanan[index].time_schedule;
    //     itemScope.alamat        = $scope.dataDetailPesanan[index].loc_schedule;
    //     itemScope.keterangan    = $scope.dataDetailPesanan[index].info_address;
    //     itemScope.metode_bayar  = $scope.dataDetailPesanan[index].metode_pembayaran;
    //     itemScope.harga         = $scope.dataDetailPesanan[index].price;
    //     itemScope.total_bayar   = $scope.dataDetailPesanan[index].subtotal;
    //   },
    //   countItems: function() {
    //     return $scope.dataDetailPesanan.length;
    //   },
    //   calculateItemHeight: function() {
    //     return 100;
    //   }
    // };

    $scope.pesananInit = function(){
        var userLoginInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        if (userLoginInfo == null) {
            app.tabbar.setActiveTab(3);
            app.tabbar.setTabbarVisibility(false);
            app.user.pushPage('login.html', {animation: 'slide'});
        }
        else{
            app.modal.show();
            $http({
                method: 'GET',
                headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                url : $rootScope.urlJSON+'api/pesanan?token='+userLoginInfo.token

            }).then(function successCallback(response){
                $scope.pesanan = [];

                for(i=0; i < response.data.length; i=i+1){
                    $scope.pesanan.push(response.data[i]);
                }

                app.modal.hide();
            }, function errorCallback(response){
                alert("Sesi Login Habis, silahkan login lagi!");
                app.modal.hide();

            });
        }
    }

    $scope.pesananDelegate = {
      configureItemScope: function(index, itemScope) {
        itemScope.id_pesanan    = $scope.pesanan[index].detail_id;
        itemScope.status_pesanan  = $scope.pesanan[index].transaction_status;
        itemScope.waktu_pesanan  = $scope.pesanan[index].transaction_time;
        itemScope.product  = $scope.pesanan[index].product_name;
      },
      countItems: function() {
        return $scope.pesanan.length;
      },
      calculateItemHeight: function() {
        return 100;
      }
    };

    $scope.startTimer = function(duration, display){
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    $scope.timecountInit = function(){
        var thirtyMinutes = 60 * 30,
        display = document.querySelector('#time');
        $scope.startTimer(thirtyMinutes, display);
    }

    

}]);

module.filter('title', function(){
    return function(html){    
        html = html.replace(/<(?:.|\n)*?>/gm, '');    
        if(html.length > 35){
            return html.substr(0,35)+'...';
        } 
        else{
            return html;
        }
    }
});

module.filter('content_intro', function(){
    return function(html){     
        return html.replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/gi,'').substr(0,60)+'...';  
    }
}) ;  