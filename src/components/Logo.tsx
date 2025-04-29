import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'w-12 h-12' }: LogoProps) {
  return (
    <img
      src="https://nahcon.gov.ng/wp-content/uploads/2020/01/cropped-NAHCON-Logo.png"
      alt="NAHCON Logo"
      className={className}
    />
  );
}