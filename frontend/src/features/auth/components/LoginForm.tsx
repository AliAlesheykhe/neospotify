'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getFromLocalStorage } from '@/utils/localStorage';
import './LoginForm.css';

// PNG Icon Components for Eye and Eye-Off
type IconProps = {
  size?: number;
  className?: string;
};

const EyeIcon = ({ size = 20, className }: IconProps) => (
  <Image
    src="/eye-on.png"
    alt="Show password"
    width={size}
    height={size}
    className={className}
    priority={false}
  />
);

const EyeOffIcon = ({ size = 20, className }: IconProps) => (
  <Image
    src="/eye-off.png"
    alt="Hide password"
    width={size}
    height={size}
    className={className}
    priority={false}
  />
);

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = getFromLocalStorage("users") || [];

    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid email or password");
      return;
    }

    if (found.role === "artist") {
      if (found.status === "pending") {
        alert("Your artist account is still pending approval.");
        return;
      }
      router.push("/artist/dashboard");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log in to NeoSpotify</h2>
      
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input" 
            placeholder="Email address"
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input" 
              placeholder="Password"
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
        </div>
        
        <button type="submit" className="submit-btn">
          Log In
        </button>

        <div className="forgot-pwd-wrapper">
          <Link href="/forgot-password" className="forgot-password-link">
            Forgot your password?
          </Link>
        </div>
      </form>
      
      <hr className="divider" />
      
      <p className="footer-text">
        Don't have an account? <Link href="/signup" className="signup-link">Sign up for NeoSpotify</Link>
      </p>
    </div>
  );
};

export default LoginForm;
