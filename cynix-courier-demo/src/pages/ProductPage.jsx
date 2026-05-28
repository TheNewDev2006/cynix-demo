import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  BarChart3, 
  Package, 
  Scan, 
  Truck, 
  CheckCircle2, 
  FileText, 
  Smartphone,
  MessageSquare
} from 'lucide-react';

export function ProductPage() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-8');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-12">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-[rgba(15,23,42,0.8)] backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold tracking-tight text-gradient leading-tight">FAIRLADY IMPORTS</h1>
        </div>
        <Button variant="secondary" onClick={() => navigate('/login')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Button>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-32 pt-20">
        
        {/* Section 1: Hero */}
        <section className="text-center space-y-12 animate-on-scroll">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              The Complete Courier <br/><span className="text-gradient">Operating System</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From US warehouse intake to last-mile delivery in the Bahamas — one platform, four roles, zero chaos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="secondary" className="h-14 px-8 text-base" onClick={() => navigate('/login')}>
                View Live Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="relative mx-auto mt-16 max-w-5xl">
             <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full"></div>
             <GlassCard className="relative p-6 flex flex-col md:flex-row gap-6 justify-between items-center border border-white/20">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(27,48,112,0.3)]">
                      <Package className="w-6 h-6 text-brand-400" />
                   </div>
                   <div className="text-left">
                      <div className="text-2xl font-bold text-white">245</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">Packages Today</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                   </div>
                   <div className="text-left">
                      <div className="text-2xl font-bold text-white">182</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">Delivered</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                      <FileText className="w-6 h-6 text-amber-400" />
                   </div>
                   <div className="text-left">
                      <div className="text-2xl font-bold text-white">$4,250</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">Revenue</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.3)]">
                      <Truck className="w-6 h-6 text-purple-400" />
                   </div>
                   <div className="text-left">
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">Active Drivers</div>
                   </div>
                </div>
             </GlassCard>
          </div>
        </section>

        {/* Section 2: Problem -> Solution */}
        <section className="animate-on-scroll">
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <FileText className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-lg font-bold text-white">Manual Tracking</h3>
              <ArrowRight className="w-4 h-4 mx-auto text-brand-400" />
              <p className="text-brand-300 font-medium">Real-time digital pipeline, QR-scanned at every stage</p>
            </GlassCard>
            <GlassCard className="p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Smartphone className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-lg font-bold text-white">Phone-based coordination</h3>
              <ArrowRight className="w-4 h-4 mx-auto text-brand-400" />
              <p className="text-brand-300 font-medium">Role-specific dashboards for staff, drivers, and customers</p>
            </GlassCard>
            <GlassCard className="p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <FileText className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-lg font-bold text-white">Ad hoc billing</h3>
              <ArrowRight className="w-4 h-4 mx-auto text-brand-400" />
              <p className="text-brand-300 font-medium">Automated invoicing with one-tap payment</p>
            </GlassCard>
          </div>
        </section>

        {/* Section 3: The Four Roles */}
        <section className="space-y-12 animate-on-scroll">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Every Person in Your Operation</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Tailored interfaces ensure everyone has exactly what they need to work efficiently.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-8 border-t-4 border-t-brand-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center border border-brand-400/30">
                  <BarChart3 className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="text-sm text-brand-300 font-bold tracking-wider uppercase">Admin / Manager</div>
                  <h3 className="text-2xl font-bold text-white">Command Centre</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-400" /> KPI dashboard & real-time metrics</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Complete package pipeline visibility</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Revenue & invoicing charts</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Daily manifest generation</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8 border-t-4 border-t-emerald-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-emerald-300 font-bold tracking-wider uppercase">Customer Portal</div>
                  <h3 className="text-2xl font-bold text-white">Self-Service Tracking</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time status updates</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Invoice view & payment</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Delivery or pickup preferences</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Notification log history</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8 border-t-4 border-t-amber-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-400/30">
                  <Scan className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm text-amber-300 font-bold tracking-wider uppercase">Warehouse Staff</div>
                  <h3 className="text-2xl font-bold text-white">Smart Intake</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Camera QR/barcode scanning</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Auto-record creation</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Customs duty flagging</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Print internal QR tracking labels</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8 border-t-4 border-t-purple-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                  <Truck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-purple-300 font-bold tracking-wider uppercase">Driver Mobile</div>
                  <h3 className="text-2xl font-bold text-white">Last-Mile, Simplified</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Daily manifest view</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Tap-to-navigate integration</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Scan-on-delivery confirmation</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Proof of delivery capture</li>
              </ul>
            </GlassCard>
          </div>
        </section>

        {/* Section 4: Lifecycle Visual */}
        <section className="space-y-12 animate-on-scroll">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Track Every Package, Every Step</h2>
            <p className="text-white/60 max-w-2xl mx-auto">From the moment it hits your US warehouse to the customer's front door.</p>
          </div>
          
          <GlassCard className="p-8 overflow-x-auto relative">
             <div className="absolute top-12 left-[10%] right-[10%] h-1 border-t-2 border-dashed border-white/20">
                <div className="absolute -top-1.5 left-0 w-3 h-3 bg-brand-400 rounded-full shadow-[0_0_12px_#7498e3] animate-[scanSweep_3s_infinite_linear]"></div>
             </div>
             
             <div className="min-w-[800px] flex justify-between relative z-10 pt-4">
                {[
                  { title: "Received US", desc: "Logged at facility", color: "#818CF8" },
                  { title: "In Transit", desc: "Shipped to Bahamas", color: "#FCD34D" },
                  { title: "Arrived", desc: "At local warehouse", color: "#38BDF8" },
                  { title: "Ready", desc: "Available for pickup", color: "#C084FC" },
                  { title: "Out for Delivery", desc: "Driver assigned", color: "#60A5FA" },
                  { title: "Delivered", desc: "Proof captured", color: "#34D399" }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center w-32 space-y-4">
                     <div className="w-6 h-6 rounded-full border-4 border-[rgba(15,23,42,1)] z-10" style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}` }}></div>
                     <div>
                        <div className="font-bold text-white text-sm">{step.title}</div>
                        <div className="text-xs text-white/50">{step.desc}</div>
                     </div>
                  </div>
                ))}
             </div>
          </GlassCard>
        </section>

        {/* Section 5: Notification Previews */}
        <section className="space-y-12 animate-on-scroll">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Customers Always in the Loop</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Automated alerts at every status change via WhatsApp Business API and email.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="notif-whatsapp-bubble p-6 relative">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">WA</div>
                    <span className="text-emerald-400 font-semibold">WhatsApp Alert</span>
                 </div>
                 <p className="text-white/90 leading-relaxed text-sm">
                    Hi Trisha! 👋 Your package (CYN-00142) has Arrived in the Bahamas. Log in to view your invoice and select delivery preferences.
                 </p>
             </div>
             <GlassCard className="p-6">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-400/30 flex items-center justify-center text-brand-400 shadow-lg">
                       <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-brand-400 font-semibold">Email Notification</span>
                 </div>
                 <p className="text-white/90 leading-relaxed text-sm">
                    <strong>Invoice Ready for Package CYN-00142</strong><br/><br/>
                    Your package is ready. Total due: $24.50. Click here to view and pay your invoice online.
                 </p>
             </GlassCard>
          </div>
        </section>

        {/* Section 6: Stats */}
        <section className="animate-on-scroll">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                 { num: "35+", label: "Packages Tracked" },
                 { num: "4", label: "Role Dashboards" },
                 { num: "Real-Time", label: "Sync" },
                 { num: "Zero", label: "Manual Errors" }
              ].map((stat, idx) => (
                 <GlassCard key={idx} className="p-6 text-center hover:bg-white/10 transition-colors">
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.num}</div>
                    <div className="text-sm font-medium text-white/70">{stat.label}</div>
                 </GlassCard>
              ))}
           </div>
        </section>

        {/* Section 7: Footer CTA */}
        <section className="animate-on-scroll">
           <GlassCard className="p-12 text-center space-y-8 bg-[rgba(27,48,112,0.4)] border-brand-500/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">Ready to modernise your courier operation?</h2>
              <p className="text-xl text-brand-200">Live demo available now. No installation required.</p>
              <Button className="h-14 px-10 text-lg" onClick={() => navigate('/login')}>
                 Enter Live Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="pt-8 text-sm text-white/40 tracking-widest uppercase">
                 "Delivered with Precision." — Fairlady Imports.
              </div>
           </GlassCard>
        </section>

      </main>
    </div>
  );
}
