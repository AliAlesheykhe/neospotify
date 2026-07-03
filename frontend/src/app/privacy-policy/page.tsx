import Link from 'next/link';
import './PrivacyPolicy.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link href="/signup" className="back-btn">
          ← Back to Sign Up
        </Link>
        
        <h1 className="privacy-title">NeoSpotify Privacy Policy</h1>
        <p className="last-updated">Last updated: July 2026</p>
        
        <div className="privacy-content">
          <h2>1. Information we collect</h2>
          <p>We collect information to provide better services to all our users. This includes basic details like your display name, email, and usage data within the NeoSpotify platform.</p>
          
          <h2>2. How we use your data</h2>
          <p>Your data is strictly used to enhance your music streaming experience, personalize playlists, and manage artist portfolios. We do not sell your personal data to third parties.</p>

          <h2>3. Security</h2>
          <p>We implement industry-standard security measures to protect your account, including securely hashing passwords and safeguarding your streaming habits.</p>

          <h2>4. Role-based Policies</h2>
          <p>If you register as an Artist, additional public profile information may be displayed on your portfolio page. Support and Admin staff only access your data for troubleshooting and moderation via the ticketing system.</p>
        </div>
      </div>
    </div>
  );
}
