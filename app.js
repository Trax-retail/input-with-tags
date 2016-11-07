angular.module('input-with-tags', [])



.controller('ctrl', function($scope) {
    $scope.tags1 = [
        'djfds',
        'dsdjfd'
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

    function updateSelectedTags (selectedTags, allTags, removedTag) {
        var options;
        options = _.pullAll(allTags, selectedTags);
        if (removedTag) {
            options.push(removedTag)
        }
        options.sort();
        return options;
    }

    return {
        restrict: 'E',

        templateUrl: 'text-tags.html',

        scope: {
            tags: '=tags',
            options: '=options',
            customTagsAllowed: '=customTagsAllowed'
        },

        link: function(scope, element, attr) {
            var input = element.find('input');
            var tagList = element.find('ul');
            var originalOptions = _.clone(scope.options);

            tagsAddVisualPadding(input, tagList[0]);

            scope.tagText = '';
            scope.showSelectList = false;
            scope.options = updateSelectedTags(scope.tags, scope.options);

            scope.addTag = function (e) {
                if (e.key === 'Enter') {
                    scope.tags.push(scope.tagText);
                    scope.tagText = '';
                    scope.options = updateSelectedTags(scope.tags, scope.options);

                    // for some ridiculous reason focus() only works with timeout.
                    $timeout(function () {
                        input[0].focus();
                    });

                    tagsAddVisualPadding(input, tagList[0]);

                } else if (e.key === 'Backspace') {
                    if (scope.tagText === '') {
                        var deletedTag = scope.tags.pop();
                        if (!_.includes(originalOptions, deletedTag)) { // do not add custom tags to list
                            deletedTag = undefined;
                        }

                        scope.options = updateSelectedTags(scope.tags, scope.options, deletedTag);
                        tagsAddVisualPadding(input, tagList[0]);
                    }
                }
            };
        }
    };
});
