import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import DayCard from './DayCard';
import { DayId } from '@/types';
import { getCurrentDayOfWeek } from '@/utils/dateUtils';

const MenuView: React.FC = () => {
  const { getCurrentWeekMenu } = useAppStore();
  const weekMenu = getCurrentWeekMenu();
  const todayRef = useRef<HTMLDivElement>(null);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  
  const dayIds: DayId[] = [1, 2, 3, 4, 5, 6, 7];
  const currentDayOfWeek = getCurrentDayOfWeek();

  // Auto-scroll to today's card only on first mount, not on every tab switch
  useEffect(() => {
    if (todayRef.current && !hasAutoScrolled) {
      const timeout = setTimeout(() => {
        todayRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        setHasAutoScrolled(true);
      }, 100); // Small delay to ensure component is fully rendered

      return () => clearTimeout(timeout);
    }
  }, [hasAutoScrolled]);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-tg-text mb-2">
          {weekMenu.title}
        </h2>
        <p className="text-tg-hint text-sm">
          Планы ужинов на неделю
        </p>
      </div>

      <div className="space-y-3">
        {dayIds.map((dayId) => {
          const isToday = dayId === currentDayOfWeek;
          
          return (
            <div
              key={dayId}
              ref={isToday ? todayRef : null}
            >
              <DayCard
                dayId={dayId}
                dish={weekMenu.days[dayId]}
                isToday={isToday}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuView;
