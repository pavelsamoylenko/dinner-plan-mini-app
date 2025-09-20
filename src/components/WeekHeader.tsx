import React from 'react';
import { useAppStore } from '@/store/appStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WeekHeader: React.FC = () => {
  const { getCurrentWeek, settings } = useAppStore();
  const weekInfo = getCurrentWeek();

  return (
    <div className="bg-tg-secondary-bg border-b border-tg-hint/20">
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between">
          {/* Navigation buttons - hidden by default as per specs */}
          {settings.showNavigation && (
            <button className="p-2 text-tg-hint hover:text-tg-text transition-colors">
              <ChevronLeft size={20} />
            </button>
          )}
          
          {/* Week title */}
          <div className="text-center flex-1">
            <h1 className="text-lg font-semibold text-tg-text">
              {weekInfo.title}
            </h1>
            <p className="text-sm text-tg-hint mt-1">
              ISO неделя {weekInfo.isoWeek}
            </p>
          </div>

          {/* Navigation buttons - hidden by default */}
          {settings.showNavigation && (
            <button className="p-2 text-tg-hint hover:text-tg-text transition-colors">
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekHeader;
