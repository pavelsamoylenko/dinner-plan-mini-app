import React from 'react';
import { Dish, DayId } from '@/types';
import { getDayName } from '@/utils/dateUtils';
import { useTelegram } from '@/hooks/useTelegram';

interface DayCardProps {
  dayId: DayId;
  dish: Dish;
}

const DayCard: React.FC<DayCardProps> = ({ dayId, dish }) => {
  const { hapticFeedback } = useTelegram();
  const dayName = getDayName(dayId);

  const handleChipClick = (part: 'garnish' | 'protein' | 'veggies', name: string) => {
    hapticFeedback('light');
    // In v1.1 this will open edit mode
    console.log(`Clicked ${part}: ${name}`);
  };

  return (
    <div className="bg-tg-secondary-bg rounded-lg p-4 border border-tg-hint/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-tg-text">
          {dayName}
        </h3>
        <span className="text-xs text-tg-hint bg-tg-bg px-2 py-1 rounded">
          День {dayId}
        </span>
      </div>

      <div className="space-y-2">
        {/* Garnish chip */}
        <button
          onClick={() => handleChipClick('garnish', dish.garnish.name)}
          className="w-full text-left p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Гарнир
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
              🌾
            </span>
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200 mt-1">
            {dish.garnish.name}
          </div>
        </button>

        {/* Protein chip */}
        <button
          onClick={() => handleChipClick('protein', dish.protein.name)}
          className="w-full text-left p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              Белок
            </span>
            <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-800 px-2 py-0.5 rounded">
              🥩
            </span>
          </div>
          <div className="text-sm text-red-800 dark:text-red-200 mt-1">
            {dish.protein.name}
          </div>
        </button>

        {/* Veggies chip */}
        <button
          onClick={() => handleChipClick('veggies', dish.veggies.name)}
          className="w-full text-left p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Овощи
            </span>
            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded">
              🥬
            </span>
          </div>
          <div className="text-sm text-green-800 dark:text-green-200 mt-1">
            {dish.veggies.name}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DayCard;
