import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Package, Users, FileText, Truck, MapPin, Scan, BarChart3, LogOut, Bell, X } from 'lucide-react';

export function AppShell() {
  const { currentUser, dispatch, notifications } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeToast, setActiveToast] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
     if (notifications.length > 0) {
        // Just show the most recent one when it arrives
        setActiveToast(notifications[0]);
        const timer = setTimeout(() => setActiveToast(null), 5000);
        return () => clearTimeout(timer);
     }
  }, [notifications]);

  if (!currentUser) {
    // If not logged in, wait a tick and navigate, or just render nothing
    // To avoid React warnings during render, we use a timeout or useEffect in real app, but here simple return
    setTimeout(() => navigate('/login'), 0);
    return null;
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const roleNav = {
    admin: [
      { path: '/admin', icon: BarChart3, label: 'Dashboard', exact: true },
      { path: '/admin/packages', icon: Package, label: 'Packages' },
      { path: '/admin/customers', icon: Users, label: 'Customers' },
      { path: '/admin/manifest', icon: FileText, label: 'Manifests' },
    ],
    customer: [
      { path: '/customer', icon: Package, label: 'My Packages', exact: true },
      { path: '/customer/invoices', icon: FileText, label: 'Invoices' },
    ],
    staff: [
      { path: '/staff', icon: BarChart3, label: 'Intake Queue', exact: true },
      { path: '/staff/scan', icon: Scan, label: 'Scan Package' },
      { path: '/staff/packages', icon: Package, label: 'Warehouse' },
    ],
    driver: [
      { path: '/driver', icon: Truck, label: 'Delivery Run' },
    ]
  };

  const navItems = roleNav[currentUser.role] || [];

  return (
    <div className="flex h-screen overflow-hidden w-full">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col justify-between" style={{
        background: 'var(--glass-dark-bg)',
        borderRight: '1px solid var(--glass-dark-border)',
        backdropFilter: 'var(--glass-dark-blur)',
        borderRadius: '0 var(--radius-2xl) var(--radius-2xl) 0',
        zIndex: 10
      }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-400/30 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                <Package className="w-5 h-5 text-blue-400" />
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">CYNIX</h1>
                <p className="text-[10px] text-white/60 tracking-wider uppercase mt-1">Courier Platform</p>
             </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map(item => {
              const active = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Button 
                  key={item.path} 
                  variant="iconPill" 
                  active={active} 
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>
        </div>
        
        <div className="p-6 border-t border-white/10">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                 <span className="font-bold text-sm">{currentUser.name.charAt(0)}</span>
              </div>
              <div className="overflow-hidden">
                 <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                 <p className="text-xs text-white/50 capitalize truncate">{currentUser.role}</p>
              </div>
           </div>
           <Button variant="iconPill" className="w-full justify-start text-red-400 hover:text-red-300" onClick={handleLogout}>
             <LogOut className="w-5 h-5" />
             <span>Log Out</span>
           </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
         <header className="sticky top-0 z-20 flex justify-end items-center px-8 py-4 backdrop-blur-md border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4 relative">
               <button 
                  className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
               >
                  <Bell className="w-5 h-5 text-white/70" />
                  {notifications.length > 0 && (
                     <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  )}
               </button>

               {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 p-0 overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 rounded-2xl" style={{ background: 'rgba(15, 23, 42, 0.60)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(40px)' }}>
                     <div className="p-4 border-b border-white/10 bg-white/10 flex justify-between items-center">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <span className="text-xs text-white/50">{notifications.length} total</span>
                     </div>
                     <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                           <div className="p-8 text-center text-white/40 text-sm">No new notifications</div>
                        ) : (
                           notifications.map((notif, idx) => (
                              <div key={idx} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                                 <div className="flex items-center gap-2 mb-1">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] font-bold">WA</div>
                                    <span className="text-white/80 text-xs font-medium">WhatsApp</span>
                                    <span className="text-white/40 text-[10px] ml-auto">{new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                 </div>
                                 <p className="text-white/70 text-sm pl-7 leading-snug">{notif.message}</p>
                              </div>
                           ))
                        )}
                     </div>
                  </div>
               )}
            </div>
         </header>
         <div className="p-8 max-w-7xl mx-auto pb-24">
           <Outlet />
         </div>

         {activeToast && (
            <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-8 duration-300">
               <div className="notif-whatsapp-bubble max-w-sm w-full relative pr-8 shadow-2xl">
                  <button onClick={() => setActiveToast(null)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                     <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">WA</div>
                     <span className="text-white/60 text-xs">WhatsApp Business</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{activeToast.message}</p>
                  <div className="text-white/40 text-[10px] mt-2 text-right">
                     {new Date(activeToast.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
               </div>
            </div>
         )}
      </main>
    </div>
  );
}
