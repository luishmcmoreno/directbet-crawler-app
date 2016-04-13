(function() {
	'use strict';

	angular
		.module('DirectBetCrawllerChart.events.controller', [])
		.controller('EventsController', EventsController);

	EventsController.$inject = ['EventsService'];

	/* @ngInject */
	function EventsController(EventsService) {
		var vm = this;

		vm.getEvent = getEvent;
		vm.selectBet = selectBet;
		vm.selectType = selectType;
		vm.addEvent = addEvent;
		
		activate();

		////////////////

		function addEvent() {
			EventsService.addEvent(vm.idEvent).then(function () {
				EventsService.getEvents().then(function (events) {
					vm.events = events;
				});				
			});
		}

		function selectType() {
			vm.values = [];
			vm.labels = [];
		}

		function selectBet() {
			var values = [[]];
			var labels = [];
			vm.series = ['Oi'];
			for (var o in vm.currentEvent.odds) {
				var bet = vm.currentEvent.odds[o];
				if (bet.type === vm.type && bet.bet === vm.bet) {
					labels.push((new Date(bet.timestamp)).toLocaleTimeString());
					values[0].push(bet.odd);
				}
			}
			vm.values = values;
			vm.labels = labels;
			console.log(vm.values, vm.labels);
		}

		function getEvent(eventId) {
			vm.loading = true;
			EventsService.updateEvent(eventId).then(function () {
				EventsService.getEvent(eventId).then(function (event) {
					event = event[0];
					vm.currentEvent = event;
					vm.types = {};
					vm.labels = undefined;
					vm.values = undefined;
					vm.type = undefined;
					for (var o in event.odds) {
						var bet = event.odds[o];
						if (!vm.types[bet.type]) {
							vm.types[bet.type] = {};
						}
						vm.types[bet.type][bet.bet] = true;
					}
					console.log(vm.types);
				}).finally(function () {
					vm.loading = false;
				});
			}).catch(function () {
				vm.loading = false;
			});
		}

		function activate() {
			EventsService.getEvents().then(function (events) {
				vm.events = events;
			});
		}
	}
})();
