import React from 'react';
import { clsx } from 'clsx';

export function Button({ variant = 'primary', className, children, active, ...props }) {
  const baseClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    iconPill: 'btn-icon-pill',
  }[variant] || 'btn-primary';

  return (
    <button className={clsx(baseClasses, active && 'active', className)} {...props}>
      {children}
    </button>
  );
}
