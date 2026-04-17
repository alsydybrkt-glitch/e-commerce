import { clsx, type ClassValue } from "clsx";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function SectionHeader({
  kicker,
  title,
  description,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-2xl">
        <span className="section-kicker mb-2 block">{kicker}</span>
        <h2 className="section-title text-3xl font-bold text-text-primary dark:text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg leading-relaxed text-text-secondary dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {children && <div className="mt-4 lg:mt-0">{children}</div>}
    </div>
  );
}
