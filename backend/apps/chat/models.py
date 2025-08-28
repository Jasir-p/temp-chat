from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class ChatRoom(models.Model):

    name = models.CharField(max_length=25, unique=True)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_rooms')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-created_at']

        

class ChatMessage(models.Model):

    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE,related_name='chat')
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='chat')
    message= models.TextField(blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)