from django.forms import ModelForm, URLField, TextInput
from resources.models import PersonalResource


class PersonalResourceForm(ModelForm):
    resource = URLField(label='Resource URL', widget=TextInput(attrs={'size':'70'}))
    class Meta:
        model = PersonalResource
        fields = ('title', 'note', 'video', 'rtype', 'tags')
        
        
class ResourceForm(ModelForm):
    class Meta:
        model = PersonalResource
        
        
