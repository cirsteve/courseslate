(function (Backbone, _, $) {
    CSLATE.models.Update = CSLATE.models.Base.extend({

        initialize: function (options) {
            this.set({
                updates: new CSLATE.collections.Updates(),
                resources: new CSLATE.collections.TopicResources()
            });
        }

    });
}(window.Backbone, window._, window.jQuery));
