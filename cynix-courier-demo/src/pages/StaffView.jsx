import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { StatusChip } from '../components/ui/StatusChip';
import { QrCode, Scan, Camera, Plus, Search, AlertTriangle, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';

export function StaffView() {
  const { packages, dispatch } = useContext(AppContext);
  const [scanning, setScanning] = useState(false);
  const [scanData, setScanData] = useState(null);
  
  const [formData, setFormData] = useState({
     customerId: 'C001',
     weight: '',
     dimensions: '30x20x15',
     value: '',
     dutyFlag: false,
  });
  
  const [generatedLabel, setGeneratedLabel] = useState(null);

  const startScanner = () => {
     setScanning(true);
     setScanData(null);
  };

  useEffect(() => {
     let html5QrCode;
     if (scanning) {
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
           { facingMode: "environment" },
           { fps: 10, qrbox: { width: 250, height: 250 } },
           (decodedText) => {
              // Success
              setScanData(decodedText);
              setScanning(false);
              setFormData(prev => ({
                 ...prev,
                 customerId: 'C' + Math.floor(Math.random() * 900 + 100).toString().padStart(3, '0'),
                 weight: (Math.random() * 5 + 0.5).toFixed(1),
                 value: Math.floor(Math.random() * 200 + 20).toString(),
              }));
              html5QrCode.stop().catch(console.error);
           },
           (errorMessage) => {
              // Ignore normal frame scan failures
           }
        ).catch(err => {
           console.error("Camera start failed:", err);
           setScanning(false);
           alert("Could not start camera. Please check permissions or use localhost/HTTPS.");
        });
     }

     return () => {
        if (html5QrCode && html5QrCode.isScanning) {
           html5QrCode.stop().catch(console.error);
        }
     };
  }, [scanning]);

  const handleSubmit = (e) => {
     e.preventDefault();
     
     // Auto-simulate scan if user forgot to click the camera button
     const currentScanData = scanData || `1Z${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
     
     const trackingNumber = `FAI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
     const newPackage = {
        id: `PKG-${Date.now()}`,
        trackingNumber,
        externalTracking: currentScanData,
        customerId: formData.customerId,
        weight: parseFloat(formData.weight) || 1,
        dimensions: formData.dimensions,
        value: parseFloat(formData.value) || 0,
        status: 'Received at US Warehouse',
        dutyFlag: formData.dutyFlag,
        timeline: [{ status: 'Received at US Warehouse', timestamp: new Date().toISOString() }],
        deliveryPreference: 'Unselected',
        driverId: null
     };
     
     dispatch({ type: 'SCAN_PACKAGE_IN', payload: newPackage });
     setGeneratedLabel(newPackage);
     
     // Reset form
     setScanData(null);
     setFormData({ customerId: 'C001', weight: '', dimensions: '30x20x15', value: '', dutyFlag: false });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print:space-y-0 print:block">
      <div className="flex justify-between items-end print:hidden">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Warehouse Intake</h1>
           <p className="text-white/60 mt-1">Scan and process incoming packages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block">
         <div className="space-y-6 print:hidden">
            <GlassCard className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">Scanner</h3>
                  <Button variant="secondary" onClick={() => scanning ? setScanning(false) : startScanner()}>
                     <Camera className="w-4 h-4 mr-2" />
                     {scanning ? 'Cancel Scan' : 'Activate Camera'}
                  </Button>
               </div>
               <div className="scan-viewfinder relative overflow-hidden min-h-[300px] w-full bg-black/40 rounded-xl">
                  {/* The reader element for html5-qrcode */}
                  <div id="reader" className="w-full h-full" style={{ display: scanning ? 'block' : 'none' }}></div>
                  
                  {!scanning && !scanData && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/40 z-10">Camera Off</span>
                     </div>
                  )}
                  
                  {scanning && (
                     <div className="absolute inset-0 pointer-events-none">
                        <div className="scan-corner z-10" style={{ top: '10%', left: '10%', borderBottom: 0, borderRight: 0 }} />
                        <div className="scan-corner z-10" style={{ top: '10%', right: '10%', borderBottom: 0, borderLeft: 0 }} />
                        <div className="scan-corner z-10" style={{ bottom: '10%', left: '10%', borderTop: 0, borderRight: 0 }} />
                        <div className="scan-corner z-10" style={{ bottom: '10%', right: '10%', borderTop: 0, borderLeft: 0 }} />
                        <div className="scan-line z-10" />
                     </div>
                  )}
                  {scanData && !scanning && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900/40 backdrop-blur-sm z-10">
                        <Scan className="w-12 h-12 text-emerald-400 mb-2" />
                        <div className="text-white font-mono text-lg">{scanData}</div>
                     </div>
                  )}
                  {scanData && <div className="scan-success z-10" />}
               </div>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="text-lg font-semibold text-white mb-6">Package Details</h3>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <label className="glass-label">Customer Mailbox / ID</label>
                     <input type="text" className="glass-input" value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="glass-label">Weight (kg)</label>
                        <input type="number" step="0.1" className="glass-input" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} required />
                     </div>
                     <div>
                        <label className="glass-label">Declared Value ($)</label>
                        <input type="number" className="glass-input" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
                     </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 pb-4">
                     <input type="checkbox" id="duty" className="w-4 h-4 rounded border-white/20 bg-white/10 text-brand-500 focus:ring-brand-500/50" checked={formData.dutyFlag} onChange={e => setFormData({...formData, dutyFlag: e.target.checked})} />
                     <label htmlFor="duty" className="text-sm text-white font-medium flex items-center gap-2">
                        Flag for Customs Duty <AlertTriangle className="w-4 h-4 text-orange-400" />
                     </label>
                  </div>
                  <Button type="submit" className="w-full">
                     <Plus className="w-4 h-4 mr-2" /> Process Package
                  </Button>
               </form>
            </GlassCard>
         </div>

         <div className="space-y-6">
            {generatedLabel ? (
               <GlassCard className="p-6 text-center print:bg-transparent print:border-none print:shadow-none print:p-0">
                  <h3 className="text-lg font-semibold text-white mb-6 print:hidden">Generated Internal Label</h3>
                  <div className="bg-white p-8 rounded-xl inline-block mb-6 relative" id="printable-label">
                     <div className="flex flex-col items-center justify-center mb-4">
                        <img src="/logo.png" alt="FAIRLADY IMPORTS Logo" className="w-16 h-16 object-contain mb-2" />
                        <div className="text-black font-bold text-xl tracking-tighter">FAIRLADY IMPORTS COURIER</div>
                     </div>
                     <QRCodeSVG value={`https://fairlady-imports.vercel.app/track?id=${generatedLabel.trackingNumber}`} size={200} level="H" />
                     <div className="font-mono text-lg font-bold text-black mt-4">{generatedLabel.trackingNumber}</div>
                     <div className="text-gray-600 text-sm mt-1">{generatedLabel.customerId} - {generatedLabel.weight}kg</div>
                  </div>
                  <Button onClick={() => window.print()} className="w-full print:hidden">
                     <Printer className="w-4 h-4" /> Print Label
                  </Button>
                  <Button variant="secondary" className="w-full mt-3 print:hidden" onClick={() => setGeneratedLabel(null)}>
                     Clear & Scan Next
                  </Button>
               </GlassCard>
            ) : (
               <GlassCard className="p-6 flex flex-col items-center justify-center text-white/40 min-h-[400px]">
                  <QrCode className="w-16 h-16 mb-4 opacity-50" />
                  <p>Process a package to generate a label.</p>
               </GlassCard>
            )}
            
            <GlassCard className="p-0 overflow-hidden print:hidden">
               <div className="p-6 border-b border-white/10 bg-white/5">
                  <h3 className="text-lg font-semibold text-white">Recent Intake</h3>
               </div>
               <div className="p-2 max-h-[300px] overflow-y-auto">
                  {packages.slice(0, 5).map(pkg => (
                     <div key={pkg.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg transition-colors">
                        <div>
                           <div className="tracking-number text-[10px] mb-1">{pkg.trackingNumber}</div>
                           <div className="text-white text-sm">{pkg.customerId}</div>
                        </div>
                        <StatusChip status={pkg.status} />
                     </div>
                  ))}
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
