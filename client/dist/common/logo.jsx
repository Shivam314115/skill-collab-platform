import React from 'react';

// lowercase file: keep API compatible with previous usage
export default function SmallLogo({ className = 'h-8 w-auto', alt = 'Site logo', src = 'logo.png', ...props }) {
  return <img src={src} alt={alt} className={className} {...props} />;
}