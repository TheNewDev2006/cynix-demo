import React from 'react';
import { clsx } from 'clsx';

export function GlassCard({ className, children, ...props }) {
  return (
    <div className={clsx('glass-card', className)} {...props}>
      {children}
    </div>
  );
}
