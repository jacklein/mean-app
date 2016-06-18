/**
 * Created by jackklein on 6/14/16.
 */

angular.module('userApp', [
    'ngAnimate',
    'app.routes',
    'authService',
    'mainCtrl',
    'userCtrl',
    'userService'
    ]);

// ngAnimate- to add animations to all our angular directives (ngShow/ngHide)
// app.routes- routing our application

// application configuration to integrate token into requests
.config(function($httpProvider) {
    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
});