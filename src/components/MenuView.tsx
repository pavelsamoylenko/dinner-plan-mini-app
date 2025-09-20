import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/appStore';
import DayCard from './DayCard';
import { DayId } from '@/types';
import { getCurrentDayOfWeek } from '@/utils/dateUtils';

const MenuView: React.FC = () => {
  const { getCurrentWeekMenu } = useAppStore();
  const weekMenu = getCurrentWeekMenu();
  const todayRef = useRef<HTMLDivElement>(null);
  
  const dayIds: DayId[] = [1, 2, 3, 4, 5, 6, 7];
  const currentDayOfWeek = getCurrentDayOfWeek();

  // Auto-scroll to today's card when component mounts
  useEffect(() => {
    if (todayRef.current) {
      const timeout = setTimeout(() => {
        todayRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100); // Small delay to ensure component is fully rendered

      return () => clearTimeout(timeout);
    }
  }, []);

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
