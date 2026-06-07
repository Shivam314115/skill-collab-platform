import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AtlasButton, AuthShell, BrandLockup } from '../../components/common/AgileUI';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Invalid email or password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell eyebrow="login to your account">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <BrandLockup size="xl" className="mb-16" />

        <div className="mb-10">
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">Login to your Account</h1>
          <p className="mt-4 text-xl font-medium text-[#aaa]">
            Unlock your Progress - Securely Access Your Project Hub
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
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

          <div>
            <label className="atlas-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`atlas-input ${errors.password ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password ? <p className="mt-2 text-sm font-semibold text-red-400">{errors.password}</p> : null}
          </div>

          {errors.submit ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
              {errors.submit}
            </div>
          ) : null}

          <div className="flex flex-col gap-4 text-base font-semibold text-[#8f8f8f] sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex cursor-pointer items-center gap-4">
              <button
                type="button"
                onClick={() => setRemember((value) => !value)}
                className={`h-7 w-7 rounded-full border transition ${remember ? 'border-[#3fbe8c] bg-[#3fbe8c]' : 'border-[#d9d9d9] bg-[#d9d9d9]'}`}
                aria-pressed={remember}
                aria-label="Remember for 30 days"
              />
              Remember for 30 Days
            </label>
            <Link to="/forgot-password" className="font-bold text-white hover:text-[#3fbe8c]">
              Forgot password
            </Link>
          </div>

          <div className="pt-8">
            <AtlasButton type="submit" disabled={loading} showIcon={false} className="mx-auto flex w-full max-w-sm">
              {loading ? 'Logging In...' : 'Log In'}
            </AtlasButton>
          </div>
        </form>

        <button
          type="button"
          className="mx-auto mt-5 flex min-h-11 w-full max-w-lg items-center justify-center gap-3 rounded-xl bg-[#303030] px-5 py-3 text-base font-extrabold text-white transition hover:bg-[#3a3a3a]"
        >
          <Chrome className="h-5 w-5 text-[#3fbe8c]" />
          Sign in with google
        </button>

        <p className="mt-12 text-center text-sm font-semibold text-[#969696]">
          Don't have an account?{' '}
          <Link to="/signup" className="font-black text-[#3fbe8c] hover:text-[#62d4a5]">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}
