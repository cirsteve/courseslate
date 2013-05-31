(function (Backbone, _, $) {
    __super__ = CSLATE.views.Base.prototype;
    CSLATE.views.CourseListDetail = CSLATE.views.Base.extend({
        template: TMPL.courses_listDetail,

        events: {
            'click .nav-link' : 'navTo'
        },

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);
            //this.render();
            return this;
        },

        onAfterRender: function () {

            if (!this.model.get('updates')) {
                this.model.getRelatedData();
            }
            this.renderSubViews(); 

            return this;
        },

        onClose: function () {
            this.model.off('relatedCollectionsSet');
        },

        renderResources: function () {
            var View = CSLATE.views.CourseResource,
                $target = this.$('#resources-target');

            this.renderCollection(this.model.get('resources'), View, $target)
        },

        renderSubViews: function () {
            this.conditionalRender(this.model.get('updates'), _.bind(this.renderUpdates, this));
            this.conditionalRender(this.model.get('resources'), _.bind(this.renderResources, this));
        },

        renderUpdates: function () {
            var View = CSLATE.views.Update,
                $target = this.$('#updates-target'),
                that = this;

            this.renderCollection(this.model.get('updates'), View, $target);
        },

        toString: function () {
            return 'ima course list detail';
        }
    });
}(window.Backbone, window._, window.jQuery));
