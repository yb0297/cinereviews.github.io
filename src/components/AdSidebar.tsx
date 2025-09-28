import React from 'react';
import { AdBanner } from './AdBanner';

export const AdSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Sidebar Ad 1 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
        <AdBanner
          adSlot="1234567890"
          style={{ display: 'block', width: '300px', height: '250px' }}
          className="mx-auto"
        />
      </div>

      {/* Sidebar Ad 2 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
        <AdBanner
          adSlot="1234567891"
          style={{ display: 'block', width: '300px', height: '600px' }}
          className="mx-auto"
        />
      </div>

      {/* Promotional Content */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Premium Reviews</h3>
        <p className="text-sm mb-4 opacity-90">
          Get access to exclusive movie reviews and early access to ratings.
        </p>
        <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};