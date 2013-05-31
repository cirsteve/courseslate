from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

from taggit.managers import TaggableManager
#from people.models import Person

class ResourceType(models.Model):
    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=60, unique=True, editable=False)
    description = models.TextField(blank=True)
    
    def __unicode__(self):
        return '%s' % self.name

    def save(self,*args,**kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(ResourceType, self).save(*args,**kwargs)

    def get_absolute_url(self):
        return '/resources/type/%s' % self.slug

class BaseResource(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=140, blank=True)
    note = models.TextField(blank=True)
    url = models.URLField(blank=True, null=True)
    video = models.BooleanField()
    rtype = models.ForeignKey('resources.ResourceType',verbose_name="Resource Type", blank=True, null=True)
    eureka = models.BooleanField()
    
    def __unicode__(self):
        return self.title
        
    class Meta:
        abstract = True
class PersonalResource(BaseResource):        
    tags = TaggableManager()
    person = models.ForeignKey('people.Person')

    def get_absolute_url(self):
        return '/resources/%s' % (self.pk)
        

