import React from 'react';
import { clsx } from 'clsx';

export function StatusChip({ status }) {
  const map = {
    'Received at US Warehouse': 'chip-us',
    'In Transit to Bahamas': 'chip-transit',
    'Arrived at Bahamas Warehouse': 'chip-arrived',
    'Ready for Collection': 'chip-ready',
    'Out for Delivery': 'chip-delivery',
    'Delivered': 'chip-delivered',
    'Failed Delivery': 'chip-failed',
  };
  
  const chipClass = map[status] || 'chip-transit';
  
  return (
    <span className={clsx('status-chip', chipClass)}>
      {status}
    </span>
  );
}
