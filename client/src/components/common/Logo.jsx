import React from 'react';
import { BrandLockup, BrandMark } from './AgileUI';

export default function Logo({ size = 'medium', className = '', showText = false }) {
  const mapSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xl: 'xl',
  };

  if (showText) {
    return <BrandLockup size={mapSize[size] || 'md'} className={className} />;
  }

  return <BrandMark size={mapSize[size] || 'md'} className={className} />;
}
