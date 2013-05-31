(function (Backbone, _, $) {
    var __super__ = CSLATE.views.Page.prototype;
    CSLATE.views.UserPage = CSLATE.views.Page.extend({
        template: TMPL.page_user,

        className: 'row-fluid user-page',

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);
            this.getLoggedUser();
            return this;
        },
        
        onAfterRender: function () {
            this.renderSubViews();
        },

        onClose: function () {
            this.model.off('relatedCollectionsSet');
        },

        renderCourses: function () {
            console.log('render user courses ', this);
            var collection = this.model.get('courses');
            this.renderCollection(collection, CSLATE.views.CourseList, this.$('#courses-target'));

        },

        renderResources: function () {
            var collection = this.model.get('resources');
            this.renderCollection(collection, CSLATE.views.ResourceList, this.$('#resources-target'));
        },

        renderSubViews: function () {
            this.conditionalRender(this.model, _.bind(this.renderUser, this));
            
            if (this.model.get('courses')) {
                this.renderRelated();
            } else {
                this.model.on('relatedCollectionsSet', _.bind(this.renderRelated, this));
            }

            return this;
        },

        renderRelated: function () {
            console.log('render related ', this);
            this.conditionalRender(this.model.get('courses'), _.bind(this.renderCourses, this), true);

            this.conditionalRender(this.model.get('resources'), _.bind(this.renderResources, this));
            return this;

        },

        renderUser: function () {
            var view = new CSLATE.views.UserDetail({model: this.model}).render();
            this.subViews.push(view);
            this.$('#user-target').html(view.el);
        }
    });
}(window.Backbone, window._,  window.jQuery));
