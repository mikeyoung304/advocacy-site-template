'use client';

interface DollarBillProps {
  className?: string;
}

export function DollarBill({ className }: DollarBillProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bill outline - rectangular like real currency */}
      <rect
        x="1"
        y="2"
        width="22"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Dollar sign - clean S shape */}
      <path
        d="M14 6C14 5.2 13.2 4.5 12 4.5C10.8 4.5 10 5.2 10 6C10 6.8 10.8 7.3 12 7.7C13.2 8.1 14 8.7 14 9.7C14 10.7 13.2 11.5 12 11.5C10.8 11.5 10 10.8 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Vertical line through S */}
      <line
        x1="12"
        y1="3.5"
        x2="12"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
