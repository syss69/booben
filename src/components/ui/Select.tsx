import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: SelectOption[];
}

export function Select({ label, hint, options, id, className = '', ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-text">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full appearance-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-text shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
