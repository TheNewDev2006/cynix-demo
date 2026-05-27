import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Package, Shield, User, Truck } from 'lucide-react';

export function Login() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (role, name) => {
    dispatch({ type: 'LOGIN', payload: { role, name, email: `${role}@cynix.com` } });
    navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white leading-none">CYNIX</h1>
              <p className="text-sm text-white/60 tracking-wider uppercase mt-1">Courier Platform</p>
            </div>
          </div>
          <h2 className="text-[32px] font-bold text-white leading-tight">
            Logistics intelligence for the modern era.
          </h2>
          <p className="text-white/60 text-lg">
            <em className="text-white/40 italic">"Delivered with Precision."</em>
          </p>
        </div>

        <GlassCard className="p-8 space-y-6">
          <div>
             <h3 className="text-xl font-bold text-white text-center">Select Demo Persona</h3>
             <p className="text-sm text-center text-white/60 mt-1">Experience the platform from different perspectives.</p>
          </div>
          
          <div className="space-y-4">
            <Button variant="secondary" className="w-full justify-start h-16 px-6 group" onClick={() => handleLogin('admin', 'Marcus Reid')}>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left ml-4">
                <div className="font-semibold text-white">Admin / Manager</div>
                <div className="text-xs text-white/50">Marcus Reid (Operations)</div>
              </div>
            </Button>
            
            <Button variant="secondary" className="w-full justify-start h-16 px-6 group" onClick={() => handleLogin('customer', 'Trisha Williams')}>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left ml-4">
                <div className="font-semibold text-white">Customer</div>
                <div className="text-xs text-white/50">Trisha Williams (Shopper)</div>
              </div>
            </Button>

            <Button variant="secondary" className="w-full justify-start h-16 px-6 group" onClick={() => handleLogin('staff', 'Devon Clarke')}>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-left ml-4">
                <div className="font-semibold text-white">Warehouse Staff</div>
                <div className="text-xs text-white/50">Devon Clarke (Intake)</div>
              </div>
            </Button>

            <Button variant="secondary" className="w-full justify-start h-16 px-6 group" onClick={() => handleLogin('driver', 'Ray Thompson')}>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-left ml-4">
                <div className="font-semibold text-white">Delivery Driver</div>
                <div className="text-xs text-white/50">Ray Thompson (Last-Mile)</div>
              </div>
            </Button>
          </div>
          
          <div className="pt-4 mt-6 border-t border-white/10 text-center">
             <Button variant="iconPill" className="mx-auto" onClick={() => navigate('/track')}>
                <span className="text-blue-400">Public Tracking Page</span>
             </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
