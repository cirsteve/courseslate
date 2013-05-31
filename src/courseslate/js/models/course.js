(function (Backbone, _, $) {
    var __super__ = CSLATE.models.Base.prototype;
    CSLATE.models.Course = CSLATE.models.Base.extend({
        url: __super__.url + 'topic/?format=json',

        initialize: function (options) {
            var options = options || {};
            __super__.initialize.apply(this, arguments);
            if (options.fetchRelated) {
                this.fetch({url:this.altUrl}).done( _.bind(this.getRelatedData, this));
            }

            return this;
        },

        getRelatedData: function (cb) {
            //both course slug and username, needed for filtered lists of resources and updates
            var slug = this.get('slug'),
                user = this.get('person').user.usernamei,
                successCB = cb || function (res) {pass;};
            var updatesCollection = new CSLATE.collections.Updates({filters:['&topic__slug='+slug,"&topic__person__user__username="+user]}),
                resourcesCollection = new CSLATE.collections.CourseResources({filters:['&topic__slug='+slug,"&topic__person__user__username="+user]});
            updatesCollection.fetch({url:updatesCollection.altUrl})
            resourcesCollection.fetch({url:resourcesCollection.altUrl});
            this.set({
                updates: updatesCollection,
                resources: resourcesCollection
            });

            this.trigger('relatedCollectionsSet');

            return this;
        }

    });
}(window.Backbone, window._, window.jQuery));
