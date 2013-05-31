(function (Backbone, _, $) {
    var __super__ = CSLATE.collections.Base.prototype;
    CSLATE.collections.Updates = CSLATE.collections.Base.extend({
        url: __super__.url + 'update/?format=json'
    });
}(window.Backbone, window._, window.jQuery));
