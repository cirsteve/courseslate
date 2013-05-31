from django.db import models
from django.contrib.auth.models import User

from courses.models import Topic 
# Create your models here.

class Person(models.Model):
    user = models.ForeignKey(User, unique=True)
    location = models.CharField(max_length=65, blank=True)
    website = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    private = models.BooleanField(default=False)
    image = models.ImageField(blank=True, null=True, upload_to='person_images')
    
    def __unicode__(self):
        return '%s' % self.user.username
    
    def get_absolute_url(self):
        return '/people/%s' % self.user.username
        
    def is_private(self):
        if private == False:
            return False
        else:
            return True
