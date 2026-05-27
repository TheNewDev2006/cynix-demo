import React from 'react';
import { clsx } from 'clsx';

export function KPICard({ title, value, icon: Icon, trend, trendUp, accentColor = 'rgba(37, 99, 235, 0.25)' }) {
  return (
    <div className="kpi-card group" style={{ '--kpi-accent-color': accentColor }}>
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.1)] mb-4 bg-white/5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-[36px] font-bold text-white leading-tight tracking-tight mb-1">{value}</div>
        <div className="text-sm text-white/60 mb-3">{title}</div>
        
        {trend && (
           <div className={clsx("text-xs font-medium", trendUp ? "text-emerald-400" : "text-amber-400")}>
              {trendUp ? '↑' : '↓'} {trend}
           </div>
        )}
      </div>
    </div>
  );
}
