export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="31"
        fill="#000000"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M 41.619 42.819 A 15.3 15.3 0 1 1 41.619 21.181"
        fill="none"
        stroke="#ffffff"
        strokeWidth="7.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
