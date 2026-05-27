import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { FileText, Download, CheckCircle, CreditCard } from 'lucide-react';

export function CustomerInvoices() {
  const { invoices, currentUser, dispatch } = useContext(AppContext);
  
  // Hardcoded C001 for demo consistency as Trisha Williams
  const customerId = 'C001'; 
  const myInvoices = invoices.filter(inv => inv.customerId === customerId);

  const handlePay = (invoiceId) => {
     dispatch({ type: 'PAY_INVOICE', payload: { invoiceId } });
     
     // Simulate WhatsApp notification for payment receipt
     dispatch({ type: 'SIMULATE_NOTIFICATION', payload: {
        type: 'whatsapp',
        to: customerId,
        message: `Thank you! We have received your payment for Invoice ${invoiceId}.`,
        timestamp: new Date().toISOString()
     }});
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Invoices & Billing</h1>
           <p className="text-white/60 mt-1">Manage your payments and download receipts.</p>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Billing History</h3>
         </div>
         <div className="overflow-x-auto">
            <div className="min-w-[800px]">
               <div className="glass-table-header">
                  <div>Invoice ID</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Action</div>
               </div>
               {myInvoices.map(inv => (
                  <div key={inv.id} className="glass-table-row items-center">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                           <FileText className="w-4 h-4 text-white/60" />
                        </div>
                        <span className="font-mono text-white text-sm">{inv.id}</span>
                     </div>
                     <div className="text-white/80 text-sm">
                        {new Date(inv.date).toLocaleDateString()}
                     </div>
                     <div className="text-white font-medium">
                        ${inv.amount.toFixed(2)}
                     </div>
                     <div>
                        {inv.status === 'Paid' ? (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                              <CheckCircle className="w-3.5 h-3.5" /> Paid
                           </div>
                        ) : (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                              <CreditCard className="w-3.5 h-3.5" /> Unpaid
                           </div>
                        )}
                     </div>
                     <div className="flex items-center gap-3">
                        {inv.status === 'Unpaid' ? (
                           <Button onClick={() => handlePay(inv.id)} className="h-8 text-xs px-4">
                              Pay Now
                           </Button>
                        ) : (
                           <button className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm" onClick={() => window.print()}>
                              <Download className="w-4 h-4" /> Receipt
                           </button>
                        )}
                     </div>
                  </div>
               ))}
               {myInvoices.length === 0 && (
                  <div className="p-8 text-center text-white/50">No invoices found.</div>
               )}
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
