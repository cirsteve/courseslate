(function (Backbone, _, $) {
    __super__ = CSLATE.collections.Base.prototype;
    CSLATE.collections.Courses = CSLATE.collections.Base.extend({
        model: CSLATE.models.Course,

        url:  __super__.url + 'topic/?format=json'

    });
}(window.Backbone, window._, window.jQuery));
