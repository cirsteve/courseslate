from django.forms import ModelForm, Textarea, CharField, URLField, TextInput
#from treebeard.forms import MoveNodeForm
from courses.models import Topic, Update, TopicResource
from taggit.forms import TagField

class TopicForm(ModelForm):
    tags = TagField()
    class Meta:
        model = Topic
        fields = ('title', 'description', 'tags', 'deadline', 'status')

"""       
class CategoryForm(MoveNodeForm):
    class Meta:
        model = Category
        fields = ('name', 'description')
"""

class UpdatesForm(ModelForm):
    class Meta:
        model = Update
        fields = ('title', 'eureka','comment')


class TopicResourceForm(ModelForm):
    resource = URLField(label='Resource URL')
    class Meta:
        model = TopicResource
        fields = ('title','eureka', 'video', 'rtype', 'note')
        
    def __init__(self, *args, **kwargs):
        super(TopicResourceForm, self).__init__(*args, **kwargs)
        if self.instance.pk:
            t = TopicResource.objects.get(id=self.instance.pk)
            self.fields['resource'].initial = t.resource.url
