(function (Backbone, _, $) {
    var __super__ = CSLATE.collections.Base.prototype;
    CSLATE.collections.Resources = CSLATE.collections.Base.extend({
        model: CSLATE.models.Resource,

        url:  __super__.url + 'resource/?format=json'


    });
}(window.Backbone, window._, window.jQuery));
