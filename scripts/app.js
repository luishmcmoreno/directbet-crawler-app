(function() {
    'use strict';

    angular
        .module('DirectBetCrawllerChart', [
           	
           	// external library
           	'chart.js',

           	// modules
            'DirectBetCrawllerChart.events.controller',
            'DirectBetCrawllerChart.events.service'
        ]);
})();
