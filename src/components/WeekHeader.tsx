import React from 'react';
import { useAppStore } from '@/store/appStore';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useTelegram } from '@/hooks/useTelegram';

const WeekHeader: React.FC = () => {
  const { getSelectedWeek, getCurrentWeek, navigateToPreviousWeek, navigateToNextWeek, resetToCurrentWeek } = useAppStore();
  const { hapticFeedback } = useTelegram();
  
  const selectedWeekInfo = getSelectedWeek();
  const currentWeekInfo = getCurrentWeek();
  const isCurrentWeek = selectedWeekInfo.weekIndex === currentWeekInfo.weekIndex;

  const handlePreviousWeek = () => {
    hapticFeedback('light');
    navigateToPreviousWeek();
  };

  const handleNextWeek = () => {
    hapticFeedback('light');
    navigateToNextWeek();
  };

  const handleResetToCurrentWeek = () => {
    hapticFeedback('selection');
    resetToCurrentWeek();
  };

  return (
    <div className="bg-tg-secondary-bg border-b border-tg-hint/20">
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between">
          {/* Previous week button */}
          <button 
            onClick={handlePreviousWeek}
            className="p-2 text-tg-hint hover:text-tg-text transition-colors active:scale-95"
            aria-label="Предыдущая неделя"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Week title */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-lg font-semibold text-tg-text">
                {selectedWeekInfo.title}
              </h1>
              {!isCurrentWeek && (
                <button
                  onClick={handleResetToCurrentWeek}
                  className="p-1 text-tg-hint hover:text-tg-text transition-colors active:scale-95"
                  title="Вернуться к текущей неделе"
                  aria-label="Вернуться к текущей неделе"
                >
                  <RotateCcw size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-tg-hint mt-1">
              ISO неделя {selectedWeekInfo.isoWeek}
              {!isCurrentWeek && (
                <span className="ml-2 text-tg-button">
                  • Неделя {selectedWeekInfo.weekIndex + 1}
                </span>
              )}
            </p>
          </div>

          {/* Next week button */}
          <button 
            onClick={handleNextWeek}
            className="p-2 text-tg-hint hover:text-tg-text transition-colors active:scale-95"
            aria-label="Следующая неделя"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekHeader;
