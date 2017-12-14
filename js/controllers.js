var myApp = angular.module('myApp', ['ngAnimate']);
var fb_access_token = 'EAAaN4efDltMBADH1x4CuoiZAZCS8avaiZAFGmg0ZCx6bNtQwOA4wnwmDZCZBlxw1kTWrQalbOaf4F1152U0vmxpZCK4oh2P4ZBRSgnbcC27cDFRlS6cfwIz2u0i0ITvLykccHadAA6RTlZBBVFoBW5WGiNaqPcfk1uOMZD';

myApp.controller('MyController', function MyController($http, $scope) {
    
                 
    function httpreq(inpurl, inpparams) {
        
        
        if($("li.active").attr("value") !== 'fav'){
            $("#progress").show(); //do not show progress bar when searching.
            $("table, #next, #prev").hide();
            $scope.user = $scope.page = $scope.event = $scope.place = $scope.group = $scope.artists = $scope.paging = [];
        }
        
        if(inpurl == "fbapi.php")
            $scope.searching = 1;
        
        $http({
            method: 'GET',
            url: inpurl,
            params: inpparams
        }).
            then(function success(response) {
                $scope.searching = 0;
                var data = response.data;
                var type = $("li.active").attr("value");
                if (inpurl === "fbapi.php") {
                    console.log(data);
                    $scope.data = data.data;
                    $scope.paging = data.paging;
                   

                } else {
                    //pagination for next and previous.
                    $scope = data;
                }
            
                if ($scope.paging) {
                    $("#prev").css("display", $scope.paging.previous ? "" : "none");
                    $("#next").css("display", $scope.paging.next ? "" : "none");
                }
            
                $("#progress").hide();
                $("table").show();
               
            }, function error(response) {});
    }
    
    $(".table-responsive, #progress, #prev, #next").hide();
    
    $scope.firstpage = function () {
        
        $("#itempage").show();
        $("#detailpage").hide();
        $scope.myValue=true;
        $scope.myValue2=false;
        
        if ($('#searchbox').val() === "") {
            $('#searchbox').tooltip('show');
        } else {
            $(".clearable").show();
            $("#itempage").show();
            $(".table-responsive").show();
            $scope.back = 0;

           
            $scope.word = $('#searchbox').val();
            
            var type = $("li.active").attr("value"),
                params = { keyword: $scope.word,
                            type: type,
                            latitude: $scope.latitude,
                            longitude: $scope.longitude};

            
            httpreq('fbapi.php', params);
        }
    };
    
    $scope.loadtab = function () {

        $("#itempage").show();
        $("#detailpage").hide();
        var type = $("li.active").attr("value");
        
        $scope.myValue=true;
        $scope.myValue2=false;
        
        if ($scope && $scope.data && $scope.data.length > 0) {
            if ($scope.word !== "") {
                $(".clearable, table").show();
                if ($scope.paging) {
                    $("#prev").css("display", $scope.paging.previous ? "" : "none");
                    $("#next").css("display", $scope.paging.next ? "" : "none");
                } else {
                    $("#prev, #next").hide();
                }
            } else {
                $("table").hide();
            }
        } else  {
            $("table").hide();
        }
       
    };
    
   
    
    
    
    $scope.clear = function () {
        $("#searchbox").val("");
        $(".clearable").hide();
        $scope.user = $scope.page = $scope.event = $scope.place = $scope.group = $scope.artists = $scope.paging = [];
        $("li").removeClass("active");
        $("li[value='user']").addClass('active');

    };
    
   
    $scope.clear();
    
    $scope.makevisible = function () {
        if ($scope.back === 1) {
            $(".table-hover, .table-responsive").show();
            $("#progress").hide();
        }
    };
    
    
    $scope.myValue=true;
    $scope.myValue2=false;  
    $scope.searching = 0;
    
    $("ul li").click(function() {
        $("ul li").removeClass("active");
        $(this).addClass("active");
    });
    
    $scope.removett = function() {
        $('#searchbox').tooltip('destroy');
    }
});


