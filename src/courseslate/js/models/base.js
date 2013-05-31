(function (Backbone, _, $) {
    var __super__ = Backbone.Model.prototype;
    CSLATE.models.Base = Backbone.Model.extend({
        url: '/api/v1/',

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);
            if (options && options.filters) {
                this.altUrl = this.url + options.filters.join().replace(/,/g,'');
            }

            return this;
        },

        parse: function (response) {
            this.beenFetched = true;
            if (response.hasOwnProperty('meta')) {
                return response.objects[0];
            } else {
                return response;
            }
        },
    });
}(window.Backbone, window._, window.jQuery));
