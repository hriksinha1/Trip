import React from "react";
import { LoaderCircle } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "onPhoto" | "outline" | "ghost" | "darkPill" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  loading = false,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles = "inline-flex min-w-24 items-center justify-center gap-2 rounded-full text-center font-medium whitespace-nowrap select-none transition-colors duration-200 active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "min-h-9 px-4 text-[13px]",
    md: "min-h-11 px-6 text-sm",
    lg: "min-h-12 px-7 text-base",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#151515] text-white hover:bg-[#2b2b2b] focus-visible:ring-[#151515]",
    secondary: "border border-[#DAD7CF] bg-white text-[#151515] hover:border-[#151515] hover:bg-[#F3F2EE] focus-visible:ring-[#151515]",
    onPhoto: "bg-white text-[#151515] hover:bg-neutral-100 focus-visible:ring-white focus-visible:ring-offset-black",
    outline: "border border-[#DAD7CF] bg-white text-[#151515] hover:border-[#151515] hover:bg-[#F3F2EE] focus-visible:ring-[#151515]",
    ghost: "bg-transparent text-white/90 hover:text-white hover:bg-white/10 focus-visible:ring-white",
    darkPill: "border border-white/15 bg-black/65 text-white hover:bg-[#151515] focus-visible:ring-white",
    link: "min-w-0 rounded-sm bg-transparent px-0 text-[#151515] underline underline-offset-4 decoration-neutral-300 hover:decoration-[#151515] focus-visible:ring-[#151515]",
  };

  const content = (
    <>
      {loading ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${disabled || loading ? "pointer-events-none opacity-50" : ""}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
