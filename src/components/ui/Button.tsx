import { APP_URL } from "@/lib/constants";

type ButtonVariant = "primary" | "secondary" | "ghost";

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 text-sm sm:text-base cursor-pointer";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-green-fresh to-forest text-white px-7 py-3.5 hover:shadow-lg hover:shadow-forest/25 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-white text-forest border border-card-border px-7 py-3.5 hover:bg-background-alt hover:border-sage",
    ghost:
      "text-forest px-4 py-2.5 hover:bg-sage-light/50",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
