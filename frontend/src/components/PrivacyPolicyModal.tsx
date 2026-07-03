'use client';

export const PrivacyPolicyModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#181818] w-full max-w-2xl p-6 rounded-lg shadow-xl relative border border-gray-700 flex flex-col max-h-[80vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-4">Privacy Policy</h3>
        
        <div className="overflow-y-auto pr-2 text-gray-300 text-sm space-y-4 flex-1">
          <p>This is a mock Privacy Policy for NeoSpotify.</p>
          <p>We collect data to provide the best possible music streaming experience. This includes your display name, email, date of birth, and gender as required by the registration phase.</p>
          <p>Artist data, including portfolios, is collected for verification purposes and may be reviewed by admins.</p>
          {/* Add more mock text to force scrolling on smaller devices if desired */}
        </div>

        <div className="pt-6 border-t border-gray-700 mt-4 flex justify-end">
          <button onClick={onClose} className="py-2 px-6 bg-white text-black font-bold rounded-full hover:scale-104 transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
