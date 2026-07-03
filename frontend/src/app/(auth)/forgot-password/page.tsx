'use client';

import Link from 'next/link';
import './ForgotPassword.css';

export default function ForgotPasswordPage() {
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert('If an account exists, a recovery link has been sent.');
  };

  return (
    <div className="page-wrapper">
      <div className="forgot-container">
        <h1 className="forgot-title">Reset your password</h1>
        <p className="forgot-subtitle">
          Enter the email address linked to your NeoSpotify account and we'll send you an email to reset your password.
        </p>

        <form onSubmit={handleReset} className="forgot-form">
          <label htmlFor="email" className="input-label">Email address</label>
          <input 
            type="email" 
            id="email"
            placeholder="name@domain.com" 
            className="form-input" 
            required 
          />
          <button type="submit" className="submit-btn">Send Link</button>
        </form>

        <Link href="/login" className="back-link">
          Back to login
        </Link>
      </div>
    </div>
  );
}
