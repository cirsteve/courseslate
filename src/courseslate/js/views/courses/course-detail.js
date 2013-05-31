(function (Backbone, _, $) {
    var __super__ = CSLATE.views.Base.prototype;
    CSLATE.views.CourseDetail = CSLATE.views.Base.extend({
        template:  TMPL.courses_detail,
        
        events: {
            'click .nav-link': 'navTo'
        },

        initialize: function (options) {
            __super__.initialize.call(this, arguments);

            return this;
        }

    });
}(window.Backbone, window._, window.jQuery));
