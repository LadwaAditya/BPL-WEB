var bplApp = angular.module('bplApp', ['ngResource','ngRoute']);

bplApp.config(
    function ($routeProvider, $locationProvider) {
        var routeRoleCheck = {
            user:{
                auth: function (bUserSvc) {
                    return bUserSvc.authUserForRoute();
                }
            }
        };

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/index',{
                templateUrl:'/partials/Main/main',
                controller:'bMainCtrl'
            })
            .when('/about',{
                templateUrl:'/partials/reg/main',
                controller:'bRegCtrl'
            })
            .when('/rules',{
                templateUrl:'/partials/rules/main'
            })
            .when('/gallery',{
                templateUrl:'/partials/gallery/main',
                controller:'bAboutCtrl'
            })
            .when('/teams',{
                templateUrl:'/partials/teams/main',
                controller:'bTeamCtrl'
            })
            .when('/login',{
                templateUrl:'/partials/user/main',
                controller:'bUserCtrl'
            })
            .when('/admin/teams',{
                templateUrl:'/partials/admin/teams/index',
                controller:'bTeamCtrlAdmin',
                resolve:routeRoleCheck.user
            })
            .when('/admin/addTeam',{
                templateUrl:'/partials/admin/addTeam/index',
                controller:'bAddTeamCtrlAdmin',
                resolve:routeRoleCheck.user
            })
            .when('/admin/updateTeam',{
                templateUrl:'/partials/admin/updateTeam/index',
                controller:'bUpdateTeamCtrlAdmin',
                resolve:routeRoleCheck.user
            })
            .otherwise({redirectTo:'/index'});
    }
);

bplApp.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if(rejection === 'not Authorised'){
            $location.path('/index');
        }
    })
});