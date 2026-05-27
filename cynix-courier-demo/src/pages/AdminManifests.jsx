import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { FileText, Printer, CheckCircle } from 'lucide-react';

export function AdminManifests() {
  const { packages } = useContext(AppContext);
  
  // A mock manifest would likely be packages Out for Delivery today
  const outForDelivery = packages.filter(p => p.status === 'Out for Delivery' || (p.status === 'Delivered' && new Date(p.timeline[p.timeline.length-1].timestamp).toDateString() === new Date().toDateString()));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Daily Manifests</h1>
            <p className="text-white/60 mt-1">Generate and print delivery manifests for drivers.</p>
         </div>
         <Button onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print Today's Manifest
         </Button>
      </div>

      <GlassCard className="p-8">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
               <FileText className="w-6 h-6" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-white">Manifest: MAN-{new Date().toISOString().slice(0,10).replace(/-/g, '')}</h2>
               <p className="text-white/60 text-sm">Driver: Ray Thompson | Date: {new Date().toLocaleDateString()}</p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-xl text-black" id="printable-manifest">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
               <div>
                  <h1 className="text-2xl font-bold tracking-tighter">CYNIX COURIER</h1>
                  <p className="text-sm font-semibold">DAILY DELIVERY MANIFEST</p>
               </div>
               <div className="text-right">
                  <p className="text-sm font-bold">DATE: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm">DRIVER: Ray Thompson</p>
                  <p className="text-sm">ROUTE: Nassau Zone 1</p>
               </div>
            </div>

            <table className="w-full text-sm text-left mb-8">
               <thead>
                  <tr className="border-b border-gray-300">
                     <th className="py-2">Tracking No.</th>
                     <th className="py-2">Customer</th>
                     <th className="py-2">Status</th>
                     <th className="py-2">Signature / Notes</th>
                  </tr>
               </thead>
               <tbody>
                  {outForDelivery.map(pkg => (
                     <tr key={pkg.id} className="border-b border-gray-200">
                        <td className="py-3 font-mono text-xs">{pkg.trackingNumber}</td>
                        <td className="py-3 font-medium">{pkg.customerId}</td>
                        <td className="py-3">
                           {pkg.status === 'Delivered' ? <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Delivered</span> : pkg.status}
                        </td>
                        <td className="py-3">
                           {pkg.status === 'Delivered' && pkg.pod ? (
                              <img src={pkg.pod} alt="signature" className="h-8 object-contain" />
                           ) : (
                              <div className="h-8 border-b border-dashed border-gray-400 w-32"></div>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>

            <div className="grid grid-cols-2 gap-8 pt-8 mt-16 border-t border-gray-300">
               <div>
                  <div className="border-b border-black mb-2"></div>
                  <p className="text-xs uppercase font-bold text-gray-500">Driver Signature</p>
               </div>
               <div>
                  <div className="border-b border-black mb-2"></div>
                  <p className="text-xs uppercase font-bold text-gray-500">Dispatch Manager Signature</p>
               </div>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
