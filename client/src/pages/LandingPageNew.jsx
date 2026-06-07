import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Zap, MessageSquare, Shield } from 'lucide-react';
import Logo from '../components/common/Logo';

// Simple, professional button component
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg border-none cursor-pointer transition-colors duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#36B083] text-white hover:bg-[#2d9a6e] focus:ring-offset-gray-900 focus:ring-green-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-offset-gray-100 focus:ring-gray-400',
    outline: 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Navigation bar
const Navigation = ({ isLoggedIn, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-gray-900">Skill Collab</span>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button 
              variant="primary" 
              onClick={() => onNavigate('/dashboard')}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                onClick={() => onNavigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#36B083] transition-colors duration-200">
      <div className="mb-4 p-3 bg-green-50 w-fit rounded-lg">
        <Icon className="w-6 h-6 text-[#36B083]" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main landing page component
export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/signup', { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isLoggedIn={false} onNavigate={navigate} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect with skilled professionals
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover talent, collaborate on projects, and build amazing things together. 
            A platform built for creators, developers, and innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="primary" 
              size="large"
              onClick={handleSignUp}
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Email signup */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083] focus:border-transparent"
              />
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Why join Skill Collab?</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to find collaborators and build amazing projects
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Users}
              title="Find Your Team"
              description="Search for collaborators based on skills, experience, and interests. Build teams that work."
            />
            <FeatureCard
              icon={Zap}
              title="Fast & Efficient"
              description="Streamlined workflows help teams ship faster. From ideation to launch in days, not months."
            />
            <FeatureCard
              icon={MessageSquare}
              title="AI-Powered Chat"
              description="Get instant answers and suggestions from our AI assistant integrated into every conversation."
            />
            <FeatureCard
              icon={Shield}
              title="Verified Skills"
              description="Endorsements and ratings help teams trust the talent. Know exactly what you're getting."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Project Management"
              description="Track progress, manage tasks, and keep everyone aligned on project goals."
            />
            <FeatureCard
              icon={ArrowRight}
              title="Portfolio Ready"
              description="Build your portfolio on the platform and showcase your best work to potential collaborators."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#36B083] mb-2">10K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#36B083] mb-2">5K+</div>
              <p className="text-gray-600">Projects Shipped</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#36B083] mb-2">100%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#36B083]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to start collaborating?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of creators and developers building amazing projects together
          </p>
          <Button 
            variant="secondary"
            size="large"
            onClick={handleSignUp}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2026 Skill Collab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
