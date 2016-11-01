angular.module('input-with-tags', [])



.controller('ctrl', function($scope) {
    $scope.tags1 = [
        'dsfds',
        'dsdffd'
    ];
    $scope.options1 = [
        'ilya',
        'slavo',
        'eyal',
        'gil',
        'nir'
    ];
})



.directive('textTags', function ($timeout) {

    function tagsAddVisualPadding(input, tagList) {
        $timeout(function () {
            var tagListLength = Math.floor(tagList.getBoundingClientRect().width);
            input.css({ 'padding-left' : tagListLength + 10 + 'px' });
        });
    }

    function removeSelectedTags (selectedTags, allTags) {
        return _.pullAll(allTags, selectedTags);
    }

    return {
        restrict: 'E',
        templateUrl: 'text-tags.html',
        scope: {
            tags: '=tags',
            options: '=options'
        },
        link: function(scope, element, attr) {
            var input = element.find('input');
            var tagList = element.find('ul');

            tagsAddVisualPadding(input, tagList[0]);

            scope.tagText = '';
            scope.options = removeSelectedTags(scope.tags, scope.options);
            scope.bla = function (e) { console.log(e) };

            scope.addTag = function (e) {

                if (e.key === 'Enter') {
                    scope.tags.push(scope.tagText);
                    scope.tagText = '';
                    scope.options = removeSelectedTags(scope.tags, scope.options);

                    // for some ridiculous reason focus() only works with timeout.
                    $timeout(function () {
                        input[0].focus();
                    });

                    tagsAddVisualPadding(input, tagList[0]);

                } else if (e.key === 'Backspace') {
                    if (scope.tagText === '') {
                        var deletedTag = scope.tags.pop();
                        scope.options.push(deletedTag);
                        tagsAddVisualPadding(input, tagList[0]);
                    }
                }
            };
        }
    };
});
