import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ProfilePictureProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onImageChange?: (file: File) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt,
  size = 'md',
  editable = false,
  onImageChange,
}) => {
  const [hover, setHover] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  const handleClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ${
        editable ? 'cursor-pointer' : ''
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className={`bg-gray-200 ${sizeClasses[size]} flex items-center justify-center`}>
          <span className="text-gray-500 text-xl font-medium">
            {alt.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {editable && (
        <>
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Camera className="text-white h-6 w-6" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}

      {editable && (
        <div className="absolute bottom-0 right-0 h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-white text-xs">+</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;