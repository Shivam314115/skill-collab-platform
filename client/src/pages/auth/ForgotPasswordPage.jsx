import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { requestPasswordReset } from '../../lib/api';
import { AtlasButton, AuthShell, BrandLockup } from '../../components/common/AgileUI';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      await requestPasswordReset(email);
      setMessage('Recovery email sent. Please check your inbox.');
    } catch {
      setError('Failed to send recovery email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell eyebrow="recover your account" artVariant="pattern">
      <BrandLockup size="lg" className="mb-12" />
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white md:text-5xl">Forgot Password?</h1>
        <p className="mt-4 text-xl font-medium text-[#aaa]">Reset your password and regain control.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="atlas-label">Email Address:</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="atlas-input pl-11"
              required
            />
          </div>
        </div>

        {message ? <p className="text-sm font-semibold text-[#3fbe8c]">{message}</p> : null}
        {error ? <p className="text-sm font-semibold text-red-400">{error}</p> : null}

        <AtlasButton type="submit" disabled={isSubmitting || !email} showIcon={false} className="w-full max-w-sm">
          {isSubmitting ? 'Sending...' : 'Send Recovery Email'}
        </AtlasButton>
      </form>

      <Link to="/login" className="mt-9 inline-flex text-sm font-black text-[#3fbe8c] hover:text-[#62d4a5]">
        Back to login
      </Link>
    </AuthShell>
  );
}
