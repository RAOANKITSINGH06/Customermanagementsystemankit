import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function ProLinkLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center size-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg text-primary-foreground shadow-lg shadow-primary/40',
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
      </svg>
    </div>
  );
}
