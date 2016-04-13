(function() {
	'use strict';

	angular
		.module('DirectBetCrawllerChart.events.service', [])
		.factory('EventsService', EventsService);

	EventsService.$inject = ['$http', '$q'];

	/* @ngInject */
	function EventsService($http, $q) {

		var API_URL = 'http://45.55.153.158:3000';

		var service = {
			getEvents: getEvents,
			getEvent: getEvent,
			addEvent: addEvent,
			updateEvent: updateEvent
		};

		return service;

		////////////////

		function getEvents() {
			var defer = $q.defer();
			$http.get(API_URL + '/events').success(function (data) {
				defer.resolve(data);
			}).catch(function (err) {
				defer.reject(err);
			});
			return defer.promise;
		}

		function addEvent(id) {
			var defer = $q.defer();
			$http.post(API_URL + '/events/' + id).success(function (data) {
				defer.resolve(data);
			}).catch(function (err) {
				defer.reject(err);
			});
			return defer.promise;
		}

		function getEvent(id) {
			var defer = $q.defer();
			$http.get(API_URL + '/events/' + id).success(function (data) {
				defer.resolve(data);
			}).catch(function (err) {
				defer.reject(err);
			});
			return defer.promise;
		}

		function updateEvent(id) {
			var defer = $q.defer();
			$http.post(API_URL + '/events/' + id, {}).success(function (data) {
				defer.resolve(data);
			}).catch(function (err) {
				defer.reject(err);
			});
			return defer.promise;
		}
	}
})();