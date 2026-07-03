'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

import './RegisterForm.css';
import { validateRegistration, ValidationErrors } from '@/utils/validation';

// png Icon Components for Eye and Eye-Off
import Image from "next/image";

// PNG Icon Components for Eye and Eye-Off
type IconProps = {
  size?: number;      // px
  className?: string; // optional extra classes
};

export const EyeIcon = ({ size = 20, className }: IconProps) => (
  <Image
    src="/eye-on.png"              // put file in: /public/eye-on.png
    alt="Show password"
    width={size}
    height={size}
    className={className}
    priority={false}
  />
);

export const EyeOffIcon = ({ size = 20, className }: IconProps) => (
  <Image
    src="/eye-off.png"             // put file in: /public/eye-off.png
    alt="Hide password"
    width={size}
    height={size}
    className={className}
    priority={false}
  />
);


export const RegisterForm = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'normal' | 'artist'>('normal');
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Visibility states for passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Run custom validation
    const validationErrors = validateRegistration(formData, accountType);
    
    // Ignore any displayName uniqueness errors that might be returned by validateRegistration
    if (validationErrors.displayName) {
      delete validationErrors.displayName;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    let newUser: any = {
      email,
      password,
      role: accountType,
      createdAt: Date.now(),
    };

    if (accountType === "normal") {
      newUser = {
        ...newUser,
        displayName: (formData.get("displayName") as string).trim(),
        dob: formData.get("dob"),
        gender: formData.get("gender"),
      };
    } else {
      newUser = {
        ...newUser,
        artistName: (formData.get("artistName") as string).trim(),
        portfolio: formData.get("portfolio"),
        status: "pending", 
      };
      alert("Registration submitted! Your artist account is pending approval.");
    }

    const existingUsers = getFromLocalStorage("users") || [];
    saveToLocalStorage("users", [...existingUsers, newUser]);

    router.push('/login');
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Sign up to start listening</h2>
      
      <div className="toggle-container">
        <button 
          type="button"
          onClick={() => {
            setAccountType('normal');
            setErrors({});
          }}
          className={`toggle-btn ${accountType === 'normal' ? 'active' : ''}`}
        >
          Listener
        </button>
        <button 
          type="button"
          onClick={() => {
            setAccountType('artist');
            setErrors({});
          }}
          className={`toggle-btn ${accountType === 'artist' ? 'active' : ''}`}
        >
          Artist
        </button>
      </div>

      <form onSubmit={handleRegister} className="register-form">
        
        {/* Email field */}
        <div className="input-field-wrapper">
          <input name="email" type="email" placeholder="Email address" className={`form-input ${errors.email ? 'input-error' : ''}`} required />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password field with eye toggle */}
        <div className="input-field-wrapper">
          <div className="password-input-container">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className={`form-input ${errors.password ? 'input-error' : ''}`} 
              required 
            />
            <button 
              type="button" 
              tabIndex={-1} 
              className="password-toggle-eye" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.password && <span className="error-message text-wrap">{errors.password}</span>}
        </div>

        {accountType === 'normal' ? (
          <>
            {/* Confirm Password field with eye toggle */}
            <div className="input-field-wrapper">
              <div className="password-input-container">
                <input 
                  name="confirm" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm Password" 
                  className={`form-input ${errors.confirm ? 'input-error' : ''}`} 
                  required 
                />
                <button 
                  type="button" 
                  tabIndex={-1} 
                  className="password-toggle-eye" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {errors.confirm && <span className="error-message">{errors.confirm}</span>}
            </div>

            {/* Display Name field */}
            <div className="input-field-wrapper">
              <input name="displayName" type="text" placeholder="Display Name" className="form-input" required />
            </div>
            
            <div className="form-row">
               <input name="dob" type="date" className="form-input" required title="Date of Birth" />
               <select name="gender" className="form-input select-input" required defaultValue="">
                 <option value="" disabled>Select Gender</option>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="other">Other</option>
               </select>
            </div>
            
            <div className="checkbox-group">
              <input type="checkbox" required id="privacy" className="form-checkbox" />
              <label htmlFor="privacy" className="checkbox-label">
                I agree to the{' '}
                <Link href="/privacy-policy" className="privacy-link" target="_blank">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </>
        ) : (
          <>
            {/* Artist Name field */}
            <div className="input-field-wrapper">
              <input name="artistName" type="text" placeholder="Artist Name" className={`form-input ${errors.artistName ? 'input-error' : ''}`} required />
              {errors.artistName && <span className="error-message">{errors.artistName}</span>}
            </div>

            <textarea 
              name="portfolio"
              placeholder="Link to Portfolio / Sample Works" 
              className="form-input textarea-input" 
              rows={3} 
              required 
            />
          </>
        )}

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>

      <p className="footer-text">
        Already have an account? <Link href="/login" className="login-link">Log in here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
