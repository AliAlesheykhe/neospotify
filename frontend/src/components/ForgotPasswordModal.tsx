'use client';

export const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#181818] w-full max-w-md p-6 rounded-lg shadow-xl relative border border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4 text-white">Reset your password</h3>
        <p className="text-gray-400 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert('Recovery email sent!'); onClose(); }}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full p-3 bg-[#121212] border border-gray-600 rounded text-white focus:border-[#1ed760] focus:ring-1 focus:ring-[#1ed760] outline-none transition-colors mb-4" 
            required 
          />
          <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-full hover:scale-104 transition-all">
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};
