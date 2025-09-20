import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { WeekInfo } from '@/types';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const TIMEZONE = 'Europe/Moscow';
const DEFAULT_BASE_WEEK = 38; // Week when the cycle starts (can be configured)

/**
 * Get current week info based on Europe/Budapest timezone
 */
export function getCurrentWeekInfo(baseWeek: number = DEFAULT_BASE_WEEK): WeekInfo {
  const now = dayjs().tz(TIMEZONE);
  const isoWeek = now.isoWeek();
  
  // Calculate which week in the 4-week cycle we're in
  const weekIndex = ((isoWeek - baseWeek) % 4 + 4) % 4 as 0 | 1 | 2 | 3;
  
  // Get start of the week (Monday)
  const startOfWeek = now.startOf('isoWeek');
  const endOfWeek = now.endOf('isoWeek');
  
  const title = `Неделя ${weekIndex + 1} · ${startOfWeek.format('DD MMM')} — ${endOfWeek.format('DD MMM')}`;
  
  return {
    weekIndex,
    startDate: startOfWeek.toDate(),
    endDate: endOfWeek.toDate(),
    isoWeek,
    title
  };
}

/**
 * Get week info for a specific week index (0-3)
 */
export function getWeekInfoByIndex(weekIndex: 0 | 1 | 2 | 3, baseWeek: number = DEFAULT_BASE_WEEK): WeekInfo {
  const now = dayjs().tz(TIMEZONE);
  const currentIsoWeek = now.isoWeek();
  const currentWeekIndex = ((currentIsoWeek - baseWeek) % 4 + 4) % 4;
  
  // Calculate how many weeks to add/subtract to get to the desired week index
  const weekDiff = weekIndex - currentWeekIndex;
  const targetDate = now.add(weekDiff, 'week');
  
  const startOfWeek = targetDate.startOf('isoWeek');
  const endOfWeek = targetDate.endOf('isoWeek');
  
  const title = `Неделя ${weekIndex + 1} · ${startOfWeek.format('DD MMM')} — ${endOfWeek.format('DD MMM')}`;
  
  return {
    weekIndex,
    startDate: startOfWeek.toDate(),
    endDate: endOfWeek.toDate(),
    isoWeek: targetDate.isoWeek(),
    title
  };
}

/**
 * Check if we need to reset the shopping checklist
 * Returns true if the week index has changed since the last reset
 */
export function shouldResetChecklist(lastResetAt?: string, baseWeek: number = DEFAULT_BASE_WEEK): boolean {
  if (!lastResetAt) {
    return true; // First time, should reset
  }
  
  const lastReset = dayjs(lastResetAt).tz(TIMEZONE);
  const lastResetWeekIndex = ((lastReset.isoWeek() - baseWeek) % 4 + 4) % 4;
  
  const currentWeekInfo = getCurrentWeekInfo(baseWeek);
  
  return currentWeekInfo.weekIndex !== lastResetWeekIndex;
}

/**
 * Get day names in Russian (Monday = 1, Sunday = 7)
 */
export function getDayName(dayId: 1 | 2 | 3 | 4 | 5 | 6 | 7): string {
  const dayNames = {
    1: 'Понедельник',
    2: 'Вторник', 
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье'
  };
  return dayNames[dayId];
}

/**
 * Get short day names in Russian
 */
export function getShortDayName(dayId: 1 | 2 | 3 | 4 | 5 | 6 | 7): string {
  const shortDayNames = {
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
    7: 'Вс'
  };
  return shortDayNames[dayId];
}

/**
 * Format date for display
 */
export function formatDate(date: Date, format: string = 'DD.MM.YYYY'): string {
  return dayjs(date).tz(TIMEZONE).format(format);
}

/**
 * Get current date in ISO format for the timezone
 */
export function getCurrentISOString(): string {
  return dayjs().tz(TIMEZONE).toISOString();
}

/**
 * Get current day of week (1 = Monday, 7 = Sunday)
 */
export function getCurrentDayOfWeek(): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const now = dayjs().tz(TIMEZONE);
  const isoWeekday = now.isoWeekday(); // dayjs returns 1-7 where 1=Monday
  return isoWeekday as 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

/**
 * Get initial week index based on current day
 * If it's Sunday (7), return next week for shopping, otherwise current week
 */
export function getInitialWeekIndex(baseWeek: number = DEFAULT_BASE_WEEK): 0 | 1 | 2 | 3 {
  const now = dayjs().tz(TIMEZONE);
  const currentDayOfWeek = now.isoWeekday();
  
  // If it's Sunday, show next week for shopping list
  const targetDate = currentDayOfWeek === 7 ? now.add(1, 'week') : now;
  
  const targetIsoWeek = targetDate.isoWeek();
  const weekIndex = ((targetIsoWeek - baseWeek) % 4 + 4) % 4 as 0 | 1 | 2 | 3;
  
  return weekIndex;
}
