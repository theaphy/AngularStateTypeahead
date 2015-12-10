var goAhead = angular.module('test', []);

goAhead.controller('testCont', function($scope, testFactory){


	testFactory.get('states.json').then(function(data){
		$scope.items = data;
		
	});

	var work = $scope.arr = [];
	var youBetter = work.toString();
	$scope.name = '';

	$scope.onItemSelected = function() {

		$scope.arr.push($scope.name);
	};
});

goAhead.directive('typedir', function($timeout){
	return {
		restrict: 'AEC',
		scope: {
			items: '=',
			prompt: '@',
			title: '@',
			subtitle: '@',
			model: '=',
			onSelect: '&'
		},
		link: function(scope, elem, attrs){
			scope.handleSelection = function(selectedItem){
				scope.model = selectedItem;
				scope.current = 0;
				scope.selected = true;
				$timeout(function() {
					scope.onSelect();
				}, 200);
				scope.current = selectedItem;
			};
			scope.current = 0;
			scope.selected = true;
			scope.isCurrent = function(index){
				return scope.current == index;

			};
			scope.setCurrent = function(index){
				scope.current = index;
	
			};
		},
		templateUrl: 'template.html'
	};
});

goAhead.factory('testFactory', function($http){
	return {
		get: function(url) {
			return $http.get(url).then(function(resp){
				return resp.data;
			});
		}
	};
});