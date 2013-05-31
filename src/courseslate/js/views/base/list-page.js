(function (Backbone, _, $) {
    __super__ = CSLATE.views.Page.prototype;
    CSLATE.views.ListPage = CSLATE.views.Page.extend({
        template: TMPL.page_list,

        className: 'row-fluid',

        events: {
            "click .top-level-nav" : "changeList"
        },

        initialize: function (options) {
            console.log('init list page');
            __super__.initialize.apply(this, arguments);
            this.collection.on('changeDetail', _.bind(this.changeDetail,this))
            this.listType = options.listType;
            return this;
        },

        changeDetail: function(model) {
            var View = this.listType === 'courses' ? CSLATE.views.CourseListDetail : CSLATE.views.ResourceListDetail;
            if (this.detailView) this.detailView.close();

            this.detailView = new View({model:model}).render();
            this.subViews.push(this.detailView);
            this.$('#detail-target').html(this.detailView.el);

        },

        changeList: function (e) {
            var $target = $(e.target),
                id = $target.attr("id");

            if ($target.hasClass('active')) return;
            CSLATE.liveRouter.navigate(id, {trigger:true})
        },

        onAfterRender: function (options) {
            this.$('#'+ this.listType ).addClass("active");
            this.showList();
        },

        onClose: function () {
            this.collection.off('changeDetail');
            return this;
        },

        renderList: function () {
            var ItemView = this.listType === "courses" ? CSLATE.views.CourseList : CSLATE.views.ResourceList,
                $target = this.$('#list-target'), 
                that = this;
                this.renderCollection(this.collection, ItemView, $target);
        },

        showList: function() {

            this.conditionalRender(this.collection, _.bind(this.renderList, this));
        }
    });
}(window.Backbone, window._,  window.jQuery));
