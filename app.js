angular.module('input-with-tags', [])


.controller('ctrl', function($scope) {
    $scope.addTag = 'sdfdsf';
    $scope.tags1 = ['dsfds','dsdffd'];
})


.directive('textTags', function ($timeout) {

    function tagsAddVisualPadding(input, tagList) {
        $timeout(function () {
            var tagListLength = Math.floor(tagList.getBoundingClientRect().width);
            input.css({
                'padding-left':
                tagListLength + 5 + 'px'
            });
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'text-tags.html',
        scope: { tags: '=tags' },
        link: function(scope, element, attr) {
            var input = element.find('input');
            var tagList = element.find('ul');

            tagsAddVisualPadding(input, tagList[0]);

            scope.tagText = '';
            scope.addTag = function (e) {

                if (e.key === 'Enter') {
                    scope.tags.push(scope.tagText);
                    scope.tagText = '';

                    // for some ridiculous reason focus() only works with timeout.
                    $timeout(function () { input[0].focus(); });
                    tagsAddVisualPadding(input, tagList[0]);

                } else if (e.key === 'Backspace') {
                    if (scope.tagText === '') {
                        scope.tags.pop();
                        tagsAddVisualPadding(input, tagList[0]);
                    }
                }
            };
        }
    };
});
