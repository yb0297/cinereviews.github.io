import React from 'react';
import { Crown, Star, Zap, Shield } from 'lucide-react';

interface PremiumBannerProps {
  onUpgrade: () => void;
}

export const PremiumBanner: React.FC<PremiumBannerProps> = ({ onUpgrade }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-xl p-6 m-4 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-6 h-6 text-yellow-200" />
            <h3 className="text-xl font-bold">Upgrade to Premium</h3>
          </div>
          <p className="text-yellow-100 mb-4">Unlock exclusive features and ad-free experience!</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="flex items-center space-x-1 text-sm">
              <Star className="w-4 h-4 text-yellow-200" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="w-4 h-4 text-yellow-200" />
              <span>Early Access</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Shield className="w-4 h-4 text-yellow-200" />
              <span>Premium Support</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Crown className="w-4 h-4 text-yellow-200" />
              <span>Exclusive Content</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">$4.99</div>
          <div className="text-yellow-200 text-sm mb-3">/month</div>
          <button
            onClick={onUpgrade}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};