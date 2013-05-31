from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
#from treebeard.mp_tree import MP_Node
from taggit.managers import TaggableManager

from resources.models import BaseResource

#from people.models import Person
# Create your models here.

"""
class Category(MP_Node):
    name = models.CharField(max_length=30, unique=True)
    slug = models.SlugField(unique=True, editable=False)
    description = models.TextField(blank=True)

    node_order_by = ['name']

    def __unicode__(self):
        return '%s' % self.name

    def save(self,*args,**kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Category, self).save(*args,**kwargs)

    def get_absolute_url(self):
        return '/topics/category/%s' % self.slug
"""

class Topic(models.Model):
    STATUS_CHOICES = (
        (0, 'Ongoing'),
        (1, 'Completed'),
    )
    person = models.ForeignKey('people.Person')
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, editable=False)
    description = models.TextField(blank=True)
    #category = models.ForeignKey(Category)
    tags = TaggableManager()
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    last_viewed = models.DateTimeField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    #image = models.ImageField(blank=True, null=True)
    #url = models.URLField(blank=True, null=True)

    def __unicode__(self):
        return '%s' % self.title

    def save(self,*args,**kwargs):
        print 'saving ', self
        if not self.id:
            self.slug = slugify(self.title)
        super(Topic, self).save(*args,**kwargs)
    
    def get_absolute_url(self):
        return '/topics/user/%s/%s' % (self.person.user.username, self.slug)
        
    class Meta:
        unique_together = (("person", "title"),("person", "slug"))


class Update(models.Model):
    title = models.CharField(max_length=200)
    comment = models.TextField(blank=True)
    topic = models.ForeignKey(Topic)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    eureka = models.BooleanField()
        
    def __unicode__(self):
        return '%s' % self.pk
        
    def get_absolute_url(self):
        return '/topics/users/%s/%s/updates/%d' % (self.topic.person.user, self.topic.slug, self.pk)

class TopicResource(BaseResource):
    topic = models.ForeignKey('courses.Topic')

    def __unicode__(self):
        return '%s -  %s' % (self.title, self.topic)

    def get_absolute_url(self):
        return '/topics/%s/%s' % (self.topic.slug, self.id)
