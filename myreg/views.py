# Create your views here.
from registration import signals
from registration.backends.default.views import RegistrationView, ActivationView
from registration.models import RegistrationProfile

from myreg.forms import TermsAndUniqueRegForm
from people.models import Person

class AccountRegistrationView(RegistrationView):
    form_class = TermsAndUniqueRegForm
    template_name = 'myreg/tosregistration_form.html'


class AccountActivationView(ActivationView):
    success_url = '/people/'
    def activate(self, request, activation_key):
        """
        Given an an activation key, look up and activate the user
        account corresponding to that key (if possible).

        After successful activation, the signal
        ``registration.signals.user_activated`` will be sent, with the
        newly activated ``User`` as the keyword argument ``user`` and
        the class of this backend as the sender.
        
        """
        activated = RegistrationProfile.objects.activate_user(activation_key)
        if activated:
            signals.user_activated.send(sender=self.__class__,
                                        user=activated,
                                        request=request)
            person = Person(user=activated)
            activated.save()
            person.save()
        return activated
