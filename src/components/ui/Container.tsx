export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-10 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
