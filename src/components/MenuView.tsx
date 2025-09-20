import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import DayCard from './DayCard';
import { DayId } from '@/types';
import { getCurrentDayOfWeek } from '@/utils/dateUtils';

interface MenuViewProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  onAutoScroll?: (scrollTop: number) => void;
  shouldAutoScroll?: boolean;
  resetAutoScroll?: boolean;
}

const MenuView: React.FC<MenuViewProps> = ({ 
  scrollContainerRef,
  onAutoScroll, 
  shouldAutoScroll = true,
  resetAutoScroll = false
}) => {
  const { getSelectedWeekMenu, getCurrentWeek, getSelectedWeek } = useAppStore();
  const weekMenu = getSelectedWeekMenu();
  const currentWeekInfo = getCurrentWeek();
  const selectedWeekInfo = getSelectedWeek();
  const isCurrentWeek = selectedWeekInfo.weekIndex === currentWeekInfo.weekIndex;
  const todayRef = useRef<HTMLDivElement>(null);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  
  const dayIds: DayId[] = [1, 2, 3, 4, 5, 6, 7];
  const currentDayOfWeek = getCurrentDayOfWeek();

  // Auto-scroll to today's card with scroll position callback - only for current week
  const performAutoScroll = useCallback(() => {
    if (todayRef.current && !hasAutoScrolled && shouldAutoScroll && isCurrentWeek && scrollContainerRef?.current) {
      const timeout = setTimeout(() => {
        if (todayRef.current && scrollContainerRef?.current) {
          const scrollableParent = scrollContainerRef.current;
          
          // Calculate the scroll position needed to center the today card
          const containerRect = scrollableParent.getBoundingClientRect();
          const cardRect = todayRef.current.getBoundingClientRect();
          const scrollTop = scrollableParent.scrollTop + cardRect.top - containerRect.top - (containerRect.height / 2) + (cardRect.height / 2);
          
          // Smooth scroll to the calculated position
          scrollableParent.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          });
          
          // Notify parent about the new scroll position after scroll animation
          setTimeout(() => {
            if (onAutoScroll && scrollableParent) {
              const finalScrollTop = scrollableParent.scrollTop;
              onAutoScroll(finalScrollTop);
            }
          }, 300); // Wait for smooth scroll to complete
          
          setHasAutoScrolled(true);
        }
      }, 100); // Small delay to ensure component is fully rendered

      return () => clearTimeout(timeout);
    }
  }, [hasAutoScrolled, shouldAutoScroll, onAutoScroll, scrollContainerRef, isCurrentWeek]);

  // Reset auto-scroll state when needed
  useEffect(() => {
    if (resetAutoScroll) {
      setHasAutoScrolled(false);
    }
  }, [resetAutoScroll]);

  // Auto-scroll only when needed
  useEffect(() => {
    if (shouldAutoScroll && !hasAutoScrolled) {
      performAutoScroll();
    }
  }, [shouldAutoScroll, hasAutoScrolled, performAutoScroll]);

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
          const isToday = dayId === currentDayOfWeek && isCurrentWeek;
          
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
