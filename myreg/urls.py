from django.conf.urls.defaults import *

from myreg.views import AccountRegistrationView, AccountActivationView

urlpatterns = patterns('',
    url(r'^activate/(?P<activation_key>\w+)/$', AccountActivationView.as_view(), name='registration_activate'),
    url(r'^register/$', AccountRegistrationView.as_view(), name='registration_register'),
    )
