(function () {
    'use strict';

    var core = angular.module('app.core');

    // Application configuration values
    var config = {
        appErrorPrefix: '[Angular Template Error] ',
        appCacheConfig: 'ciandt.kickstarter'
    };

    core.value('config', config);

    // Configure the app
    core.config(configFunction);

    configFunction.$inject = [
        '$compileProvider',
        '$logProvider',
        '$mdIconProvider',
        '$mdThemingProvider',
        'exceptionHandlerProvider',
        '$httpProvider',
        'CacheFactoryProvider'
    ];

    /* @ngInject */
    function configFunction(
        $compileProvider,
        $logProvider,
        $mdIconProvider,
        $mdThemingProvider,
        exceptionHandlerProvider,
        $httpProvider,
        CacheFactoryProvider){

        // During development, you may want to set debugInfoEnabled to true. This is required for tools like
        // Protractor, Batarang and ng-inspector to work correctly. However do not check in this change.
        // This flag must be set to false in production for a significant performance boost.
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        exceptionHandlerProvider.configure(config.appErrorPrefix);

        $mdIconProvider
            .iconSet('content', 'images/content-icons.svg', 24)
            .iconSet('navigation', 'images/navigation-icons.svg', 24);

        $mdThemingProvider.definePalette('app-blue', $mdThemingProvider.extendPalette('blue', {
            '50': '#DCEFFF',
            '100': '#AAD1F9',
            '200': '#7BB8F5',
            '300': '#4C9EF1',
            '400': '#1C85ED',
            '500': '#106CC8',
            '600': '#0159A2',
            '700': '#025EE9',
            '800': '#014AB6',
            '900': '#013583',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100',
            'contrastStrongLightColors': '300 400 A200 A400'
        }));

        $mdThemingProvider.definePalette('app-red', $mdThemingProvider.extendPalette('red', {
            'A100': '#DE3641'
        }));

        $mdThemingProvider.theme('default')
            .primaryPalette('app-blue')
            .accentPalette('app-red');


        $httpProvider.interceptors.push('CoreInterceptor');

        var cacheConfig = {
    		maxAge: (60 * 60 * 1000) * 24, // Items added to this cache expire after 1 hour.
    		cacheFlushInterval: (60 * 60 * 1000) * 24, // This cache will clear itself every hour.
    		deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
    		storageMode: 'localStorage', // localStorage, sessionStorage or memory
            storagePrefix: 'ciandt_app_cache_'
		};

		angular.extend(CacheFactoryProvider.defaults, cacheConfig);

    }
})();
