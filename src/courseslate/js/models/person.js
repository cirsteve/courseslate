(function (Backbone, _, $) {
    var __super__ = CSLATE.models.Base.prototype;
    CSLATE.models.Person = CSLATE.models.Base.extend({
        url: __super__.url + 'person/?format=json',

        initialize: function (options) {
            __super__.initialize.apply(this, arguments);
            var options = options || {};
            if (options.fetchRelated) {
                var url = this.altUrl || this.url;
                this.fetch({'url':url}).done(_.bind(this.getRelatedData, this));
            } else {
                this.fetch();
            }

            return this;
        },

        getRelatedData: function () {
            var name = this.get('user').username,
                coursesCollection = new CSLATE.collections.Courses({filters:['&person__user__username='+name]}),
                resourcesCollection = new CSLATE.collections.Resources({filters:['&person__user__username='+name]});
            coursesCollection.fetch({url:coursesCollection.altUrl});
            resourcesCollection.fetch({url:resourcesCollection.altUrl});
            this.set({
                'courses': coursesCollection,
                'resources': resourcesCollection
            });

            this.trigger('relatedCollectionsSet');

            return this;
        }

    });
}(window.Backbone, window._, window.jQuery));
