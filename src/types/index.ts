// Domain types for the family dinner menu app

export type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Mon=1 ... Sun=7

export interface DishPart {
  id: string;
  name: string;
  note?: string;
}

export interface Dish {
  garnish: DishPart;
  protein: DishPart;
  veggies: DishPart;
}

export interface WeekMenu {
  id: string;
  title: string;
  days: Record<DayId, Dish>;
}

export type ShoppingCategory = 
  | 'meat'
  | 'fish' 
  | 'grains'
  | 'vegetables'
  | 'fruits'
  | 'dairy_eggs'
  | 'canned'
  | 'sauces'
  | 'spices'
  | 'other';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  qty?: string; // "1 кг", "2 шт", "500 г"
}

export interface HouseholdProfile {
  id: string;
  members: string[];
  tz: string;
}

export interface WeekState {
  weekIndex: 0 | 1 | 2 | 3; // current week in 4-week cycle
  checklist: Record<string, boolean>; // ShoppingItem.id → bought
  lastResetAt?: string; // ISO timestamp
}

// App state interfaces
export interface AppSettings {
  baseWeek: number; // ISO week number for cycle start
  showNavigation: boolean;
  enableSync: boolean;
  language: 'ru' | 'en';
  householdId?: string;
}

export interface AppState {
  currentTab: 'menu' | 'shopping';
  settings: AppSettings;
  weekState: WeekState;
  menus: WeekMenu[]; // 4-week cycle
  shoppingItems: ShoppingItem[]; // all available ingredients
  isLoading: boolean;
  error?: string;
}

// Telegram WebApp integration
export interface TelegramTheme {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

// Utility types
export interface WeekInfo {
  weekIndex: 0 | 1 | 2 | 3;
  startDate: Date;
  endDate: Date;
  isoWeek: number;
  title: string;
}

export interface ShoppingProgress {
  total: number;
  completed: number;
  percentage: number;
}

export interface GroupedShoppingItems {
  [category: string]: {
    items: ShoppingItem[];
    checked: number;
    total: number;
  };
}
