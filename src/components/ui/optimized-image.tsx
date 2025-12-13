import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallback = '/images/placeholder.png',
  lazy = true,
  className = '',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageSrc = hasError ? fallback : src;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 rounded-lg">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
}