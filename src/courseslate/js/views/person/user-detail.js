(function (Backbone, _, $) {
    var __super__ = CSLATE.views.Base.prototype;
    CSLATE.views.UserDetail = CSLATE.views.Base.extend({
        template:  TMPL.user_detail,

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);

            return this;
        }

    });
}(window.Backbone, window._, window.jQuery));
