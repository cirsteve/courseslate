(function (Backbone, _, $) {
    __super__ = CSLATE.views.Base.prototype;
    CSLATE.views.CourseList = CSLATE.views.Base.extend({
        template: TMPL.courses_listItem,

        events: {
            'click' : 'showDetail',
            'click .nav-link' : 'navTo'
        },

        className: 'list-item',

        initialize: function (options) {
            __super__.initialize.call(this, arguments);
            this.render();
            return this;
        },

        showDetail: function () {
            console.log('sd clicked');
            if (this.$el.hasClass('active')) return;

            $('.list-item').removeClass('active');
            this.$el.addClass('active');
            this.model.trigger('changeDetail', this.model);
        }
    });
}(window.Backbone, window._, window.jQuery));
