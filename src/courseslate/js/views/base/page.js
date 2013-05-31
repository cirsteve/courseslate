(function (Backbone, _, $) {
    __super__ = CSLATE.views.Base.prototype;
    CSLATE.views.Page = CSLATE.views.Base.extend({

        render: function () {
            this.$el.html(this.template({}));
            this.onAfterRender && this.onAfterRender();
            return this;
        }
    });
}(window.Backbone, window._, window.jQuery));
