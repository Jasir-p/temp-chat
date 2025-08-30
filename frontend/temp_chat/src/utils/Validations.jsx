export function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) return "Email is required";

  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmed)) return "Enter a valid email address";

  return null;
}

export function validateName(value) {
  const trimmed = value.trim();

  if (!trimmed) return "Name is required";

  if (trimmed.length < 2) return "Name must be at least 2 characters";

  if (trimmed.length > 50) return "Name must be less than 50 characters";

  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Name can only contain letters, spaces, hyphens, apostrophes, and dots";
  }

  if (/\s{2,}/.test(trimmed)) {
    return "Name cannot have consecutive spaces";
  }
  if (/^[\s\-'.]|[\s\-'.]$/.test(trimmed)) {
    return "Name cannot start or end with special characters";
  }

  return null;
}


export function teamValidateDescription(value) {
  const trimmed = value.trim();

  if (!trimmed || !/[A-Za-z]/.test(trimmed)) {
    return "Team description must contain at least one alphabet character and not be empty or whitespace only.";
  }

  return null;

  
}

export function validatePassword(value) {
  const trimmed = value.trim();

  if (trimmed.length < 8) {
    return "Password must be at least 8 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  if (!passwordRegex.test(trimmed)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
  }

  return null; 
}