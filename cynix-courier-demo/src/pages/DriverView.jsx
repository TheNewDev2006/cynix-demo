import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { StatusChip } from '../components/ui/StatusChip';
import { MapPin, Scan, CheckCircle, XCircle, Navigation } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WAREHOUSE_COORDS = [25.0440, -77.3300];

// Deterministic mock coordinates based on package ID
const getPackageCoords = (pkgId) => {
   const hash = pkgId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
   const latOffset = (hash % 100) / 4000 - 0.012;
   const lngOffset = ((hash * 7) % 100) / 4000 - 0.012;
   return [WAREHOUSE_COORDS[0] + latOffset, WAREHOUSE_COORDS[1] + lngOffset];
};

function MapUpdater({ activeDelivery }) {
   const map = useMap();
   useEffect(() => {
      if (activeDelivery) {
         const coords = getPackageCoords(activeDelivery.id);
         const bounds = L.latLngBounds([WAREHOUSE_COORDS, coords]);
         map.fitBounds(bounds, { padding: [50, 50] });
      } else {
         map.setView(WAREHOUSE_COORDS, 13);
      }
   }, [activeDelivery, map]);
   return null;
}

export function DriverView() {
  const { packages, dispatch } = useContext(AppContext);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [showPod, setShowPod] = useState(false);
  const sigCanvas = useRef({});
  
  // Get packages for today's run
  const myRun = packages.filter(p => p.status === 'Out for Delivery' || (p.status === 'Delivered' && new Date(p.timeline[p.timeline.length-1].timestamp).toDateString() === new Date().toDateString()));

  const handleScanDelivery = (pkg) => {
     setActiveDelivery(pkg);
     // Simulate successful scan
     setTimeout(() => {
        setShowPod(true);
     }, 1000);
  };

  const submitDelivery = () => {
     const podData = sigCanvas.current.isEmpty() ? null : sigCanvas.current.toDataURL();
     dispatch({ type: 'MARK_DELIVERED', payload: { packageId: activeDelivery.id, podData } });
     
     // Simulate notification
     dispatch({ type: 'SIMULATE_NOTIFICATION', payload: {
        type: 'whatsapp',
        to: activeDelivery.customerId,
        message: `Your package ${activeDelivery.trackingNumber} has been delivered successfully.`,
        timestamp: new Date().toISOString()
     }});

     setShowPod(false);
     setActiveDelivery(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Today's Run</h1>
         <p className="text-white/60 mt-1">Route optimized for maximum efficiency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
               <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-white">{myRun.length}</div>
                  <div className="text-xs text-white/60">Total</div>
               </div>
               <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{myRun.filter(p => p.status === 'Delivered').length}</div>
                  <div className="text-xs text-white/60">Delivered</div>
               </div>
               <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-brand-400">{myRun.filter(p => p.status === 'Out for Delivery').length}</div>
                  <div className="text-xs text-white/60">Remaining</div>
               </div>
            </div>

            <div className="space-y-4">
               {myRun.map(pkg => (
                  <GlassCard 
                     key={pkg.id} 
                     className={`p-5 transition-all ${activeDelivery?.id === pkg.id ? 'ring-2 ring-brand-500 shadow-[0_0_20px_rgba(81,126,221,0.3)]' : ''}`}
                  >
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                           <div className="flex items-center gap-2 mb-2">
                              <span className="tracking-number text-[10px]">{pkg.trackingNumber}</span>
                              {pkg.status === 'Delivered' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                           </div>
                           <div className="text-white font-medium">{pkg.customerId}</div>
                           <div className="text-sm text-white/60 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> Delivery Location
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                              onClick={() => setActiveDelivery(pkg)}
                              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-brand-400"
                              title="Show Route"
                           >
                              <Navigation className="w-4 h-4" />
                           </button>
                           {pkg.status === 'Out for Delivery' ? (
                              <Button onClick={() => { setActiveDelivery(pkg); setTimeout(() => setShowPod(true), 300); }}>
                                 <Scan className="w-4 h-4 mr-2" /> Deliver
                              </Button>
                           ) : (
                              <StatusChip status={pkg.status} />
                           )}
                        </div>
                     </div>
                  </GlassCard>
               ))}
               {myRun.length === 0 && (
                  <div className="text-center p-8 text-white/40 glass-card">No packages assigned for today.</div>
               )}
            </div>
         </div>

         {/* Map Column */}
         <div className="aspect-square w-full sticky top-24 max-h-[800px]">
            <GlassCard className="w-full h-full p-0 overflow-hidden relative z-0">
               <MapContainer center={WAREHOUSE_COORDS} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                  <TileLayer 
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
                  />
                  
                  <MapUpdater activeDelivery={activeDelivery} />

                  <Marker position={WAREHOUSE_COORDS}>
                     <Popup>
                        <strong>FAIRLADY IMPORTS Warehouse</strong><br/>
                        Nassau, Bahamas
                     </Popup>
                  </Marker>
                  
                  {myRun.map(pkg => {
                     const coords = getPackageCoords(pkg.id);
                     const isActive = activeDelivery?.id === pkg.id;
                     return (
                        <React.Fragment key={pkg.id}>
                           <Marker position={coords}>
                              <Popup>
                                 <strong>{pkg.trackingNumber}</strong><br/>
                                 Customer: {pkg.customerId}<br/>
                                 Status: {pkg.status}
                              </Popup>
                           </Marker>
                           {isActive && (
                              <Polyline 
                                 positions={[WAREHOUSE_COORDS, coords]} 
                                 color="#3B82F6" 
                                 weight={4} 
                                 dashArray="8, 8" 
                                 opacity={0.8}
                              />
                           )}
                        </React.Fragment>
                     );
                  })}
               </MapContainer>
            </GlassCard>
         </div>
      </div>

      {showPod && (
         <div className="modal-backdrop flex items-center justify-center p-4">
            <div className="modal-panel w-full max-w-md space-y-6">
               <h3 className="text-xl font-bold text-white">Proof of Delivery</h3>
               <p className="text-white/60 text-sm">Please ask the recipient to sign below for package <strong className="text-white">{activeDelivery?.trackingNumber}</strong>.</p>
               
               <div className="bg-white rounded-xl overflow-hidden border-2 border-white/20">
                  <SignatureCanvas 
                     ref={sigCanvas}
                     penColor="black"
                     canvasProps={{className: 'w-full h-48'}} 
                  />
               </div>
               <div className="flex justify-end gap-2 text-sm">
                  <button className="text-brand-400 hover:text-brand-300" onClick={() => sigCanvas.current.clear()}>Clear Signature</button>
               </div>

               <div className="flex gap-4 pt-4">
                  <Button variant="danger" className="w-full" onClick={() => { setShowPod(false); setActiveDelivery(null); }}>
                     <XCircle className="w-4 h-4" /> Cancel
                  </Button>
                  <Button className="w-full" onClick={submitDelivery}>
                     <CheckCircle className="w-4 h-4" /> Complete
                  </Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
