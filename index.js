var classes = require('classes'),
    events = require('event');

module.exports = function(options) {
    options = options || {};

    var refresh = function() {
        var item,
            l = list.matchingItems.length,
            index = list.i,
            page = list.page,
            pages = Math.ceil(l / page),
            currentPage = Math.ceil((index / page)),
            innerWindow = options.innerWindow || 2,
            left = options.left || options.outerWindow || 0,
            right = options.right || options.outerWindow || 0;

        right = pages - right;

        var paginationDOM = document.querySelector('.' + options.paginationClass);
        if (! paginationDOM) {
            return;
        }
        paginationDOM.innerHTML = "<span class='" + options.paginationShowMoreClass + "'>"+options.paginationShowMoreTitle+"</span><span>" + options.paginationSeparator + "</span><span class='" + options.paginationShowAllClass + "'>" + options.paginationShowAllTitle + "</span>";
        if (l <= page) {
            for(var i=0;i<paginationDOM.childNodes.length;i++) {
                paginationDOM.childNodes[i].style.display = 'none';
            }
            return;
        }
        
        events.bind(paginationDOM.childNodes[0], 'click', function() {
            var itemsCount = (index + 1) * page;
            list.show(1, itemsCount);
        });

        events.bind(paginationDOM.childNodes[paginationDOM.childNodes.length - 1], 'click', function() {
            list.show(1, list.matchingItems.length);
        });
    };

    var addEvent = function(elm, i, page) {
       events.bind(elm, 'click', function() {
           list.show((i-1)*page + 1, page);
       });
    };

    return {
        init: function(parentList) {
            list = parentList;

            options.paginationClass = options.paginationClass || 'pagination';
            options.paginationShowMoreClass = options.paginationShowMoreClass || 'listjs-pagination-show-more';
            options.paginationShowAllClass = options.paginationShowAllClass || 'listjs-pagination-show-all';
            options.paginationSeparator = options.paginationSeparator || '|';
            options.paginationShowMoreTitle = options.paginationShowMoreTitle || 'Show More';
            options.paginationShowAllTitle = options.paginationShowAllTitle || 'Show All';
            
            list.on('updated', refresh);
            refresh();
        },
        name: options.name || "pagination"
    };
};
