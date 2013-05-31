$('#current-user').on('click', function(e) {
    $('#profile-box').toggle();
});
$(document).ready(function () {
    CSLATE.liveRouter = new CSLATE.AppRouter();
    Backbone.history.start({pushState:true});
    //CSLATE.liveRouter.navigate('courses', {trigger:true});
});
