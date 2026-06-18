import type { ReactNode } from "react";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";

/** Shared input/select/combobox styling for admin forms */
export const adminFieldClass =
  "h-10 w-full bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600 shadow-none";

export const adminTextareaClass =
  "min-h-[88px] w-full bg-white/[0.04] border-white/10 text-white placeholder:text-gray-600 shadow-none resize-y";

export const adminCardClass =
  "rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-none";

/** Visible toggle styling on dark admin backgrounds (plain CSS — see index.css .admin-switch) */
export const adminSwitchClass = "admin-switch shrink-0";

interface AdminFormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function AdminFormField({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: AdminFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="text-gray-300 text-sm font-medium">
        {label}
        {required && <span className="text-[#db7d30] ml-0.5">*</span>}
      </Label>
      {hint && <p className="text-gray-500 text-xs leading-relaxed -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
      <div className="min-w-0 space-y-1">
        {eyebrow && (
          <p className="text-gray-600 text-[11px] uppercase tracking-[0.18em]">{eyebrow}</p>
        )}
        <h1 className="text-white text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-gray-500 text-sm max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function AdminSection({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(adminCardClass, "p-5 md:p-6", className)}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="text-white text-sm font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
