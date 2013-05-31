(function (Backbone, _, $) {
    CSLATE.collections.Base = Backbone.Collection.extend({
        url: '/api/v1/', 

        initialize: function (options) {
            if (options && options.filters) {
                this.altUrl = this.url + options.filters.join().replace(/,/g,'');
            }
            return this;
        },

        parse: function (resp) {
            this.beenFetched = true;
            return resp.objects;
        }

    });
}(window.Backbone, window._, window.jQuery));
