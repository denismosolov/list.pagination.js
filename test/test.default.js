describe('Test', function() {
    var list,
        itemHTML,
        pagination;

    before(function() {
        itemHTML = fixture.list(['name'])
        list = new List('list', {
            valueNames: ['name'],
            item: itemHTML,
            page: 200,
            plugins: [
                ListPagination()
            ]
        }, fixture.all);

        pagination = $('.pagination');
    });

    after(function() {
        fixture.removeList();
    });

    it('Default settings', function() {
         expect(pagination.find('span').size()).to.equal(3);
         expect(pagination.find('.listjs-pagination-show-more').get(0).innerHTML).to.equal("Show More");
         expect(pagination.find('.listjs-pagination-show-all').get(0).innerHTML).to.equal("Show All");
         expect(pagination.find('span').get(0).innerHTML).to.equal("Show More");
         expect(pagination.find('span').get(1).innerHTML).to.equal("|");
         expect(pagination.find('span').get(2).innerHTML).to.equal("Show All");
    });

    it('Hidden', function() {
    	expect(pagination.find('span').get(0).style.display).to.equal('none');
    })
});
