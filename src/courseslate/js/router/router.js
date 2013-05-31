(function (Backbone, _, $) {
    CSLATE.Router = Backbone.Router.extend({
        showView: function (view) {
            if (this.currentView) this.currentView.close();

            this.currentView = view;
            $('#main-body').html(this.currentView.render().el);
        },

    });

}(window.Backbone, window._, window.jQuery));
