from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from tastypie.api import Api
from courses.views import HomeView
from apiEndpoints.api import PersonResource, TopicAPIResource, UpdateResource, TopicResourceResource, ResourceResource, TagResource
from apiEndpoints.views import get_logged_in_user, get_topic_form, json_topic_form

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(PersonResource())
v1_api.register(TopicAPIResource())
v1_api.register(UpdateResource())
v1_api.register(TopicResourceResource())
v1_api.register(ResourceResource())
v1_api.register(TagResource())

urlpatterns = patterns('',
    url(r'^resources/', include('resources.urls')),
    url(r'^topics/', include('courses.urls')),
    url(r'^people/', include('people.urls')),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^accounts/', include('myreg.urls')),
    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^api/', include(v1_api.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^get-user/', get_logged_in_user),
    url(r'^get-topic-form/', get_topic_form),
    url(r'^json-topic-form/', json_topic_form),
    url(r'^$', HomeView.as_view()),
)
urlpatterns += staticfiles_urlpatterns()
