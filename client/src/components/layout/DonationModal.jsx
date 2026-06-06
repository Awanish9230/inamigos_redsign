import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { X } from 'lucide-react';

const DonationModal = () => {
  const { isDonationModalOpen, setDonationModalOpen } = useStore();
  const [amount, setAmount] = useState('1000');
  
  if (!isDonationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 backdrop-blur-sm px-4">
      <div className="bg-primary w-full max-w-md rounded-2xl p-6 relative shadow-2xl border border-light/10">
        <button 
          onClick={() => setDonationModalOpen(false)}
          className="absolute top-4 right-4 text-light/50 hover:text-light transition"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-display font-bold text-light mb-2">Make a Difference</h3>
        <p className="text-light/70 mb-6 text-sm">Your contribution helps us transform lives. Choose an amount to donate.</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {['100', '500', '1000', '5000'].map(val => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`py-2 rounded-lg border transition-all ${amount === val ? 'bg-accent border-accent text-light' : 'border-light/20 text-light/80 hover:border-accent'}`}
            >
              ₹{val}
            </button>
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-xs text-light/50 mb-1">Custom Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light/50">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-dark/50 border border-light/20 rounded-lg py-3 pl-8 pr-4 text-light focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <button className="w-full bg-green text-dark font-bold py-3 rounded-lg hover:bg-green/90 transition shadow-[0_0_15px_rgba(0,200,117,0.4)]">
          Proceed to Pay
        </button>
        <p className="text-xs text-center text-light/40 mt-4">Payments are secured by Razorpay</p>
      </div>
    </div>
  );
};

export default DonationModal;
