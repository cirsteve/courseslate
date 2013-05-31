(function (Backbone, _, $) {
    CSLATE.AppRouter = CSLATE.Router.extend({
        routes: {
            'user/:user/course/:courseSlug': 'courseDetail',
            'user/:user/resource/:resourceId': 'resourceDetail',
            'user/:user': 'userOverview',
            ':listType': 'home',
            '': 'home'
        },

        initialize: function (options) {
            return this;
        },

        courseDetail: function (user, courseSlug) {
            var course = new CSLATE.models.Course({filters:['&person__user__username='+user,'&slug='+courseSlug], fetchRelated:true}),
                detailView = new CSLATE.views.DetailPage({model:course});

            //course.getRelatedData();

            this.showView(detailView);
            

        },

        resourceDetail: function (user, resourceSlug) {

        },

        userOverview: function (user) {
            var person, userView;
            if (CSLATE.cache.users.hasOwnProperty(user)) {
                person = CSLATE.cache.users[user];
            } else {
                person = new CSLATE.models.Person({filters:['&user__username='+user], fetchRelated:true});
                CSLATE.cache.users[user] = person;
            }

            userView = new CSLATE.views.UserPage({model:person});

            this.showView(userView);
        },

        home: function (listType) {
            var listType = listType || "courses";
            if (!CSLATE.cache.collections[listType]) {
                var upperType = listType.up1stCh();
                CSLATE.cache.collections[listType] = new CSLATE.collections[upperType];
                CSLATE.cache.collections[listType].fetch();
            }
            var listView = new CSLATE.views.ListPage({collection:CSLATE.cache.collections[listType], listType: listType});
            this.showView(listView);
        }
    });

}(window.Backbone, window._, window.jQuery));
