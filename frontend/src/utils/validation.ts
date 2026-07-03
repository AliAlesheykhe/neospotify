import { getFromLocalStorage } from '@/utils/localStorage';

export interface ValidationErrors {
  email?: string;
  password?: string;
  confirm?: string;
  displayName?: string;
  artistName?: string;
}

// Password strength regex: Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateRegistration = (
  formData: FormData,
  accountType: 'normal' | 'artist'
): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const email = (formData.get("email") as string || "").trim();
  const password = formData.get("password") as string || "";
  const confirm = formData.get("confirm") as string || "";
  const displayName = (formData.get("displayName") as string || "").trim();
  const artistName = (formData.get("artistName") as string || "").trim();

  // 1. Password Strength Check
  if (!PASSWORD_REGEX.test(password)) {
    errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).";
  }

  // 2. Passwords Match Check (Only applicable for normal/listener users)
  if (accountType === 'normal' && password !== confirm) {
    errors.confirm = "Passwords do not match.";
  }

  // Retrieve current database mock in LocalStorage
  const existingUsers = getFromLocalStorage("users") || [];

  // 3. Email Uniqueness Check
  const emailExists = existingUsers.some(
    (user: any) => user.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExists) {
    errors.email = "This email address is already registered.";
  }

  // 4. Username / Name Uniqueness Checks
  if (accountType === 'normal') {
    const displayNameExists = existingUsers.some(
      (user: any) => 
        user.role === 'normal' && 
        user.displayName?.toLowerCase() === displayName.toLowerCase()
    );
    if (displayNameExists) {
      errors.displayName = "This display name is already taken.";
    }
  } else {
    const artistNameExists = existingUsers.some(
      (user: any) => 
        user.role === 'artist' && 
        user.artistName?.toLowerCase() === artistName.toLowerCase()
    );
    if (artistNameExists) {
      errors.artistName = "This artist name is already registered.";
    }
  }

  return errors;
};
