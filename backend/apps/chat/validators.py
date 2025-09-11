import re
from utils.constants import NAME_REGEX,DESCRIPTION_HAS_ALPHANUMERIC_REGEX,DESCRIPTION_START_REGEX
from django.core.exceptions import ValidationError



def validate_tittle(value):
    if not value :
            raise ValidationError('Room Tittle is required')
    if len(value) < 3 :
            raise ValidationError('Room Tittle must be at least 3 characters long')
    if not re.match(NAME_REGEX,value):
            raise ValidationError('Room Tittle must contain only letters and numbers')
    return value
def validate_description(value):
        words = value.strip().split()
        if not words:
            raise ValidationError("Notes cannot be empty")
        if len(words)<5:
            raise ValidationError("Notes should be at least 5 words")
        if not re.match(DESCRIPTION_START_REGEX, value):
            raise ValidationError("Notes must start with a letter or number.")
        if not re.match(DESCRIPTION_HAS_ALPHANUMERIC_REGEX,value):
            raise ValidationError("Notes cannot contain only special characters.")
        
        return value