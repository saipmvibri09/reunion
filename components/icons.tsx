type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v13m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
