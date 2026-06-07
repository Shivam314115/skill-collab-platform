import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chrome, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AtlasButton, AuthShell, BrandLockup } from '../../components/common/AgileUI';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});

    try {
      await signup(formData.email, formData.password, formData.fullName);
      setSuccess(true);
      setTimeout(() => navigate('/profile-builder'), 1600);
    } catch (error) {
      setErrors({ submit: error.message || 'An unknown error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthShell eyebrow="create your workspace">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-[#292929] p-10 text-center">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-[#3fbe8c]" />
          <h1 className="text-4xl font-black text-white">Account Created!</h1>
          <p className="mt-3 text-lg font-semibold text-[#aaa]">Welcome to AgileAtlas. Redirecting to your profile setup...</p>
        </motion.div>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="create your account">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <BrandLockup size="lg" className="mb-12" />

        <div className="mb-9">
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">Sign up for AgileAtlas</h1>
          <p className="mt-4 text-xl font-medium text-[#aaa]">
            Empower your projects, simplify your success
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="atlas-label">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`atlas-input ${errors.fullName ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.fullName ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.fullName}</p> : null}
          </div>

          <div>
            <label className="atlas-label">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`atlas-input ${errors.email ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.email}</p> : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="atlas-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`atlas-input ${errors.password ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
                placeholder="Create a password"
              />
              {errors.password ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.password}</p> : null}
            </div>
            <div>
              <label className="atlas-label">Confirm:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`atlas-input ${errors.confirmPassword ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.confirmPassword}</p> : null}
            </div>
          </div>

          {errors.submit ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
              {errors.submit}
            </div>
          ) : null}

          <div className="pt-5">
            <AtlasButton type="submit" disabled={loading} showIcon={false} className="mx-auto flex w-full max-w-sm">
              {loading ? 'Creating Account...' : 'Create Account'}
            </AtlasButton>
          </div>
        </form>

        <button
          type="button"
          className="mx-auto mt-5 flex min-h-11 w-full max-w-lg items-center justify-center gap-3 rounded-xl bg-[#303030] px-5 py-3 text-base font-extrabold text-white transition hover:bg-[#3a3a3a]"
        >
          <Chrome className="h-5 w-5 text-[#3fbe8c]" />
          Sign up with google
        </button>

        <p className="mt-10 text-center text-sm font-semibold text-[#969696]">
          Already have an account?{' '}
          <Link to="/login" className="font-black text-[#3fbe8c] hover:text-[#62d4a5]">
            Log In
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}
