(function (Backbone, _, $) {
    var __super__ = CSLATE.collections.Base.prototype;
    CSLATE.collections.CourseResources = CSLATE.collections.Base.extend({
        url: __super__.url + 'course_resource/?format=json',

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);
            return this;
        }
    });
}(window.Backbone, window._, window.jQuery));
