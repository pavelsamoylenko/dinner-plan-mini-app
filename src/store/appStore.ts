import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, AppSettings } from '@/types';
import { seedMenus } from '@/data/seedMenus';
import { seedIngredients } from '@/data/seedIngredients';
import { getCurrentWeekInfo, shouldResetChecklist, getCurrentISOString } from '@/utils/dateUtils';
import { getWeekIngredients } from '@/utils/shoppingUtils';

interface AppStore extends AppState {
  // Actions
  setCurrentTab: (tab: 'menu' | 'shopping') => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleShoppingItem: (itemId: string) => void;
  resetShoppingList: () => void;
  markAllShoppingItems: () => void;
  initializeApp: () => void;
  checkAndResetWeek: () => void;
  
  // Computed values
  getCurrentWeek: () => ReturnType<typeof getCurrentWeekInfo>;
  getCurrentWeekMenu: () => typeof seedMenus[0];
  getCurrentShoppingItems: () => ReturnType<typeof getWeekIngredients>;
}

const getHouseholdId = (): string => {
  // For now, use a default household ID since we don't have user auth
  // In future versions this will come from Telegram user data
  return 'default-household';
};

const getStorageKey = (householdId: string, key: string): string => {
  return `famenu:${householdId}:${key}`;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTab: 'menu',
      settings: {
        baseWeek: 38, // Week 38 of 2024 as default starting point
        showNavigation: false,
        enableSync: false,
        language: 'ru',
        householdId: getHouseholdId()
      },
      weekState: {
        weekIndex: 0,
        checklist: {},
        lastResetAt: getCurrentISOString()
      },
      menus: seedMenus,
      shoppingItems: seedIngredients,
      isLoading: false,

      // Actions
      setCurrentTab: (tab) => {
        set({ currentTab: tab });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },

      toggleShoppingItem: (itemId) => {
        set((state) => {
          const newChecklist = { ...state.weekState.checklist };
          newChecklist[itemId] = !newChecklist[itemId];
          
          return {
            weekState: {
              ...state.weekState,
              checklist: newChecklist
            }
          };
        });
      },

      resetShoppingList: () => {
        set((state) => ({
          weekState: {
            ...state.weekState,
            checklist: {},
            lastResetAt: getCurrentISOString()
          }
        }));
      },

      markAllShoppingItems: () => {
        const currentItems = get().getCurrentShoppingItems();
        
        const allCheckedList: Record<string, boolean> = {};
        currentItems.forEach(item => {
          allCheckedList[item.id] = true;
        });
        
        set((state) => ({
          weekState: {
            ...state.weekState,
            checklist: allCheckedList
          }
        }));
      },

      initializeApp: () => {
        get().checkAndResetWeek();
      },

      checkAndResetWeek: () => {
        const { settings, weekState } = get();
        const currentWeekInfo = getCurrentWeekInfo(settings.baseWeek);
        
        // Check if we need to reset the checklist for a new week
        if (shouldResetChecklist(weekState.lastResetAt, settings.baseWeek) || 
            weekState.weekIndex !== currentWeekInfo.weekIndex) {
          
          set({
            weekState: {
              weekIndex: currentWeekInfo.weekIndex,
              checklist: {}, // Пустой checklist для новой недели
              lastResetAt: getCurrentISOString()
            }
          });
        }
      },

      // Computed values
      getCurrentWeek: () => {
        const { settings } = get();
        return getCurrentWeekInfo(settings.baseWeek);
      },

      getCurrentWeekMenu: () => {
        const { weekState } = get();
        return seedMenus[weekState.weekIndex];
      },

      getCurrentShoppingItems: () => {
        const currentWeekMenu = get().getCurrentWeekMenu();
        return getWeekIngredients(currentWeekMenu);
      }
    }),
    {
      name: getStorageKey(getHouseholdId(), 'appState'),
      storage: createJSONStorage(() => localStorage),
      // Only persist certain parts of the state
      partialize: (state) => ({
        settings: state.settings,
        weekState: state.weekState,
        currentTab: state.currentTab
      }),
      // Handle version migration if needed
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration logic for version 0 -> 1 if needed
          return persistedState;
        }
        return persistedState;
      }
    }
  )
);
