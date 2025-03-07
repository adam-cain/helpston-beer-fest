import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FlyerPopupProps {
  popupId: string; // Unique ID for this popup (to distinguish in localStorage)
  onClose?: () => void; // Optional callback when popup is closed
}

export default function FlyerPopup({ popupId, onClose }: FlyerPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if this popup has been closed before
    // const hasBeenClosed = false;
    const hasBeenClosed = localStorage.getItem(`popup_closed_${popupId}`);
    
    if (!hasBeenClosed) {
      // Only show the popup if it hasn't been closed before
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popupId]);
  
  const closePopup = () => {
    setIsVisible(false);
    document.body.style.overflow = 'auto';
    
    // Mark this popup as closed in localStorage
    localStorage.setItem(`popup_closed_${popupId}`, 'true');
    
    // Call optional onClose callback if provided
    if (onClose) {
      onClose();
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/75"
      onClick={closePopup} // Close when clicking outside
    >
      <button 
        onClick={closePopup}
        className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-white transition-colors z-[60]" 
        aria-label="Close"
      >
        <X size={24} className='text-black'/>
      </button>
      <div 
        className="relative bg-transparent overflow-hidden z-[50] h-[calc(100vh-20px)] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="h-full rounded-lg overflow-hidden">
          <Image
            src="/other/Flyer.jpg"
            alt="Beer Festival Flyer"
            width={2000}
            height={2000}
            className="h-full w-auto object-contain max-h-[calc(100vh-20px)]"
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}