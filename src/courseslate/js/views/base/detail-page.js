(function (Backbone, _, $) {
    var __super__ = CSLATE.views.Page.prototype;
    CSLATE.views.DetailPage = CSLATE.views.Page.extend({
        template: TMPL.page_detail,

        className: 'row-fluid',

        initialize: function (options) {
            __super__.initialize.call(this, arguments);


            return this;
        },
        
        onAfterRender: function () {
            this.renderSubViews();
        },

        onClose: function () {
            this.model.off('relatedCollectionsSet');
        },

        renderCourse: function () {
            this.$('#course-target').html(this.courseView.render().el);
        },

        renderResources: function () {
            var collection = this.resources;
            this.renderCollection(collection, CSLATE.views.CourseResource,this.$('#resources-target'));
        },

        renderSubViews: function () {
        //views that can be rendered as soon as page anchors are rendered

            this.courseView = new CSLATE.views.CourseDetail({model:this.model});
            this.subViews.push(this.courseView);
            this.conditionalRender(this.model, _.bind(this.renderCourse, this));

            if (this.model.get('updates')) {
                this.renderRelated();
            } else {
                this.model.on('relatedCollectionsSet', _.bind(this.renderRelated, this));
            }

            return this;
        },

        renderRelated: function () {
            this.updates = this.model.get('updates');
            this.conditionalRender(this.updates, _.bind(this.renderUpdates, this));
            
            this.resources = this.model.get('resources');
            this.conditionalRender(this.resources, _.bind(this.renderResources, this));
        },

        renderUpdates: function () {
            this.renderCollection(this.updates, CSLATE.views.Update,this.$('#updates-target'));
        }

    });
}(window.Backbone, window._,  window.jQuery));
