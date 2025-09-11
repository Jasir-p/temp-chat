import re
from utils.constants import NAME_REGEX,EMAIL_REGEX,PASSWORD_REGEX
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User



def validate_username(value):
        value = value.strip()
        if not value :
            raise ValidationError('Username is required')
        if len(value) < 3 :
            raise ValidationError('Username must be at least 3 characters long')
        if not re.match(NAME_REGEX,value):
            raise ValidationError('Username must contain only letters and numbers')
        return value
    
def validate_email(value):
        value = value.strip()
        if not value :
            raise ValidationError('Email is required')
        if not re.match(EMAIL_REGEX,value):
            raise ValidationError('Invalid email')
        return value
        
def validate_password(value):
        value = value.strip()
        if not value :
            raise ValidationError('Password is required')
        if len(value) < 8 :
            raise ValidationError('Password must be at least 8 characters long')
        if not re.match(PASSWORD_REGEX,value):
            raise ValidationError('Password must contain at least one uppercase letter, ' 
            'one lowercase letter, one digit and one special character')
        
        return value