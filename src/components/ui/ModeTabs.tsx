import { useTranslation } from 'react-i18next';
import type { ReviewMode } from '@/types/review';

interface ModeTabsProps {
  mode: ReviewMode;
  onChange: (mode: ReviewMode) => void;
  disabled?: boolean;
}

export function ModeTabs({ mode, onChange, disabled }: ModeTabsProps) {
  const { t } = useTranslation();

  const tabs: { id: ReviewMode; label: string }[] = [
    { id: 'link', label: t('modes.link') },
    { id: 'manual', label: t('modes.manual') },
  ];

  return (
    <div
      className="mb-6 flex rounded-xl bg-surface p-1"
      role="tablist"
      aria-label="Input mode"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={mode === tab.id}
          disabled={disabled}
          onClick={() => onChange(tab.id)}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 ${
            mode === tab.id
              ? 'bg-white text-primary-hover shadow-sm'
              : 'text-muted hover:text-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
