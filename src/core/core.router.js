(function () {
    'use strict';

    angular
        .module('app.core')
        .config(configFunction);

        configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$injector'];

        /* @ngInject */
        function configFunction($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $injector) {

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise( function($injector) {
              var $state = $injector.get("$state");
              $state.go('public.welcome');
            });

            $stateProvider
                .state('private', {
                    url: '',
                    templateUrl: 'layout/layout.private.html',
                    abstract: true,
                    controller: 'CoreController',
                    controllerAs: 'core',
                    data: {
                        permissions: {
                            only: ['ROLE_USER'],
                            redirectTo: 'public.login'
                        }
                    }
                })
                .state('public', {
                    url: '',
                    templateUrl: 'layout/layout.public.html',
                    abstract: true
                })
                .state('private.home', {
                    url: '/dashboard',
                    template: '<tmpl-home></tmpl-home>'
                })

                .state('private.quickstart', {
                    url: '/quickstart',
                    template: '<tmpl-quickstart></tmpl-quickstart>'
                })

                .state('private.edit', {
                    url: '/post/edit/:id',
                    template: '<tpl-post></tpl-post>',
                    data: {
                        permissions: {
                            only: ['ROLE_ADMIN'],
                            redirectTo: 'private.home'
                        }
                    }
                })

                .state('private.add', {
                    url: '/post/new',
                    template: '<tpl-post></tpl-post>',
                })

                .state('public.login', {
                    url: '/login',
                    templateUrl: 'src/components/login/login.html',
                    controller: 'LoginController',
                    controllerAs:'vm',
                    data: {
                        permissions: {
                            except: ['ROLE_USER'],
                            redirectTo: 'private.home'
                        }
                    }
                })
                .state('public.welcome', {
                    url: '/welcome',
                    templateUrl: 'src/components/landingpage/index.html'
                })


    }
})();
