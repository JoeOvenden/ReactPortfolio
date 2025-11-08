'use client';

import { useState } from 'react';

export default function ServerActionButton({
  action,
  children,
  className = '',
}: {
  action: () => Promise<unknown>;
  children: React.ReactNode;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await action();
    } catch (error) {
      console.error('Action failed:', error);
      alert('Failed. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`bg-green-800 text-white rounded px-4 py-2 font-medium transition-opacity ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
      } ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}