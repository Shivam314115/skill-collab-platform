import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, KeyRound } from 'lucide-react';
import { confirmPasswordReset } from '../../lib/api';
import { AtlasButton, AuthShell, BrandLockup } from '../../components/common/AgileUI';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userIdParam = searchParams.get('userId') || searchParams.get('user');
    const secretParam = searchParams.get('secret');
    if (userIdParam && secretParam) {
      setUserId(userIdParam);
      setSecret(secretParam);
    } else {
      setErrors({ general: 'Invalid or expired reset link. Please try again.' });
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && userId && secret) {
      setIsSubmitting(true);
      setErrors({});
      try {
        await confirmPasswordReset(userId, secret, formData.password);
        setIsSuccess(true);
      } catch {
        setErrors({ general: 'Failed to reset password. The link may have expired.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <AuthShell eyebrow="password updated" artVariant="pattern">
        <BrandLockup size="lg" className="mb-12" />
        <div className="rounded-3xl bg-[#292929] p-10 text-center">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-[#3fbe8c]" />
          <h1 className="text-4xl font-black text-white">Password Updated!</h1>
          <p className="mt-3 text-lg font-semibold text-[#aaa]">You can now log in with your new password.</p>
          <AtlasButton onClick={() => navigate('/login')} showIcon={false} className="mt-8">
            Proceed to Login
          </AtlasButton>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="secure your account" artVariant="pattern">
      <BrandLockup size="lg" className="mb-12" />
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white md:text-5xl">Create New Password</h1>
        <p className="mt-4 text-xl font-medium text-[#aaa]">Choose a new, secure password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <div>
          <label className="atlas-label">New Password:</label>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
            <input
              name="password"
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className={`atlas-input pl-11 ${errors.password ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
              autoComplete="new-password"
            />
          </div>
          {errors.password ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.password}</p> : null}
        </div>

        <div>
          <label className="atlas-label">Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`atlas-input ${errors.confirmPassword ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
            autoComplete="new-password"
          />
          {errors.confirmPassword ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.confirmPassword}</p> : null}
        </div>

        {errors.general ? <p className="text-sm font-semibold text-red-400">{errors.general}</p> : null}

        <AtlasButton type="submit" disabled={isSubmitting || !userId || !secret} showIcon={false} className="w-full max-w-sm">
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </AtlasButton>
      </form>

      <Link to="/" className="mt-9 inline-flex text-sm font-black text-[#3fbe8c] hover:text-[#62d4a5]">
        Back to landing page
      </Link>
    </AuthShell>
  );
}
