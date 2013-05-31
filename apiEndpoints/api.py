from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import DjangoAuthorization
from tastypie import fields

from django.contrib.auth.models import User
from courses.models import Topic, Update, TopicResource
from resources.models import PersonalResource, ResourceType
from taggit.models import Tag
from people.models import Person

class UserResource(ModelResource):
    class Meta:
        excludes = ['password', 'is_active', 'is_staff', 'is_superuser']
        queryset = User.objects.all()
        resource_name = 'user'
        filtering = {
            'username': 'exact',
        }

class PersonResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    class Meta:
        queryset = Person.objects.all()
        resource_name = 'person'
        authorization = DjangoAuthorization()
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }

class TagResource(ModelResource):
    class Meta:
        queryset = Tag.objects.all()
        resource_name = 'tag'
        authorization = DjangoAuthorization()

class ResourceTypeResource(ModelResource):
    class Meta:
        queryset = ResourceType.objects.all()
        resource_name = 'resource_type'
        authorization = DjangoAuthorization()

class TopicAPIResource(ModelResource):
    tags = fields.ToManyField(TagResource, 'tags', full=True)
    person = fields.ForeignKey(PersonResource, 'person', full=True)
    class Meta:
        queryset = Topic.objects.all()
        resource_name = 'topic'
        authorization = DjangoAuthorization()
        filtering = {
            'person': ALL_WITH_RELATIONS,
            'slug':['exact'],
        }

class UpdateResource(ModelResource):
    topic = fields.ForeignKey(TopicAPIResource, 'topic')
    class Meta:
        queryset = Update.objects.all()
        resource_name = 'update'
        authorization = DjangoAuthorization()
        filtering = {
            'topic': ALL_WITH_RELATIONS,
        }

class TopicResourceResource(ModelResource):
    topic = fields.ForeignKey(TopicAPIResource, 'topic')
    resource_type = fields.ForeignKey(ResourceTypeResource, 'resource_type')
    
    class Meta:
        queryset = TopicResource.objects.all()
        resource_name = 'course_resource'
        authorization = DjangoAuthorization()
        filtering = {
            'topic': ALL_WITH_RELATIONS,
        }

class ResourceResource(ModelResource):
    tags = fields.ToManyField(TagResource, 'tags', full=True)
    resource_type = fields.ForeignKey(ResourceTypeResource, 'resource_type')
    class Meta:
        queryset = PersonalResource.objects.all()
        resource_name = 'resource'
        authorization = DjangoAuthorization()
