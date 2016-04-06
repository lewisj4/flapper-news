var app = angular.module('flapperNews',['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
		  .state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
   	      })
		  .state('posts', {
		  url:'/posts/{id}',
	      templateUrl: '/posts.html',
		  controller: 'PostsCtrl'
});
		$urlRouterProvider.otherwise('home');	
	}]);
// define URL with brackets around 'id'. Means that 'id'
//is actually a route paramter that will be made available
//to the controller

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);
//define the controller
//AngularJS invokes the controller with a $scope object
app.controller('MainCtrl', [
//$scope is the application object (owner of application variables and functions)	
'$scope',
'posts',
function($scope, posts){
	$scope.test = 'Hello world';
//$scope variable serves as a bridge b/w 
//Angular controllers and Angular templates
//If you want something to be accessible in the template
//such as a function or variable, bind it to $scope	
	// $scope.posts = [
	// {title: 'yoga pants run the world', upvotes: 15, downvotes: 12},
	// {title: 'Trump is trumping America to ruin', upvotes: 100, downvotes: 9},
	// {title: 'Milennials to run the world', upvotes: 4, downvotes: 2},
	// {title: 'Where humanity is heading. Hint: it\'s not earth', upvotes: 22, downvotes: 7},
	// {title: 'Who will win the battle of Man vs. Robot', upvotes: 16, downvotes: 1}
	// ];
	$scope.posts = posts.posts;
	// button ng-click="addPost()" in index syncs with this function
	$scope.addPost = function (){
		if(!$scope.title || $scope.title === '') {return;};
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link, 
			upvotes: 0,
			downvotes:0,
			comments: [
				{author: 'Joe', body: 'Cool post', upvotes: 0 },
				{author: 'Bob', body: 'Great idea, poor execution', upvotes: 0},
			]
		});
		$scope.title = '';
		$scope.link = '';
	};
	// span ng-click="incrementUpvotes(post)" in index syncs to this function	
	$scope.incrementUpvotes = function(post) {
		post.upvotes +=1;	
	};
	// span ng-click="decrementUpvotes(post)" in index syncs to this function
	$scope.decrementUpvotes = function(post) {
		post.downvotes +=1;
	};
}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function() {
		if($scope.body === '') { return; }
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};
}]);



