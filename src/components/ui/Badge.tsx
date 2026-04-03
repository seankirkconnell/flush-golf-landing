export default function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-sage-light px-4 py-1.5 text-xs font-medium text-forest tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
