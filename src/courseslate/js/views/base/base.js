(function (Backbone, _, $) {
    __super__ = Backbone.View.prototype;
    CSLATE.views.Base = Backbone.View.extend({

        initialize: function (options) {
            this.subViews = [];
            return this;
        },

        close: function () {
            _.forEach(this.subViews, function(view) {
                view.close();
            });
            this.remove();
            this.unbind();
            this.onClose && this.onClose();
        },

        getLoggedUser: function (cb) {
            var success = cb || _.bind(this.setLoggedUser, this);

            $.ajax({
                method: 'GET',
                url:'/get-user',
                success: success,
                dataType:'json'
            })
            
        },

        getTopicForm: function (cb) {
            var success = cb || function (res) { console.log('topicform ',res); };

            $.ajax({
                method: 'GET',
                url:'/get-topic-form',
                success: success,
                dataType:'json'
            })
            
        },

        setLoggedUser: function(resp) {
            console.log('logged in is user ', resp);
            this.loggedUser = resp.user;
        },

        conditionalRender: function (object, renderFunc) {
            if (object.beenFetched) {
                renderFunc();
            } else {
                object.on('sync',renderFunc);
            }

            return this;
        },

        navTo: function (e) {
            e.preventDefault();
            var $target = $(e.target),
                href = $target.attr('href');
            CSLATE.liveRouter.navigate(href, {trigger:true});
        },

        renderCollection: function (collection, View, $target) {
            var that = this;

            if (collection.length === 0) {
                $target.html('<h4>No items</h4>');
                return this;
            }
            
            collection.each(function(item) {
                var view = new View({model:item});
                that.subViews.push(view);
                $target.append(view.render().el);
            });

            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.onAfterRender && this.onAfterRender();
            return this;
        }
    });
}(window.Backbone, window._, window.jQuery));
