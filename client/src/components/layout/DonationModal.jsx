import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { X } from 'lucide-react';

const DonationModal = () => {
  const { isDonationModalOpen, setDonationModalOpen } = useStore();
  const [amount, setAmount] = useState('1000');
  
  if (!isDonationModalOpen) return null;

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 backdrop-blur-md px-4">
      <div 
        className="w-full max-w-md rounded-3xl p-8 relative shadow-[0_0_50px_rgba(27,42,107,0.5)] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)',
          border: '1px solid rgba(255,107,0,0.15)',
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

        <button 
          onClick={() => setDonationModalOpen(false)}
          className="absolute top-6 right-6 text-light/50 hover:text-accent transition z-10"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-3xl font-display font-bold text-light mb-2 relative z-10">Make a Difference</h3>
        <p className="text-light/60 mb-8 text-sm relative z-10">Your contribution helps us transform lives. Choose an amount to donate.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
          {['100', '500', '1000', '5000'].map(val => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="py-3 rounded-xl font-bold transition-all"
              style={{
                background: amount === val ? 'rgba(255,107,0,0.15)' : 'rgba(255,255,255,0.04)',
                border: amount === val ? '1px solid #FF6B00' : '1px solid rgba(255,255,255,0.1)',
                color: amount === val ? '#FF6B00' : 'rgba(255,255,255,0.8)'
              }}
            >
              ₹{val}
            </button>
          ))}
        </div>
        
        <div className="mb-8 relative z-10">
          <label className="block text-xs font-bold text-light/50 uppercase tracking-wider mb-2">Custom Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light/50 font-bold">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-4 pl-10 pr-4"
              style={inputStyle}
            />
          </div>
        </div>

        <button 
          className="w-full py-4 rounded-xl font-bold text-lg text-light relative overflow-hidden z-10"
          style={{
            background: 'linear-gradient(135deg, #FF6B00, #ff8c38)',
            boxShadow: '0 4px 24px rgba(255,107,0,0.35)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 32px rgba(255,107,0,0.5)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 24px rgba(255,107,0,0.35)';
          }}
        >
          Proceed to Pay ➤
        </button>
        <p className="text-xs text-center text-light/40 mt-6 relative z-10">Payments are secured by Razorpay</p>
      </div>
    </div>
  );
};

export default DonationModal;
