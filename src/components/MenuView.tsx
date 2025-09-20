import React from 'react';
import { useAppStore } from '@/store/appStore';
import DayCard from './DayCard';
import { DayId } from '@/types';

const MenuView: React.FC = () => {
  const { getCurrentWeekMenu } = useAppStore();
  const weekMenu = getCurrentWeekMenu();

  const dayIds: DayId[] = [1, 2, 3, 4, 5, 6, 7];

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
        {dayIds.map((dayId) => (
          <DayCard
            key={dayId}
            dayId={dayId}
            dish={weekMenu.days[dayId]}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuView;
