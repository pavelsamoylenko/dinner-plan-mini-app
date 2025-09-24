import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, AppSettings } from '@/types';
import { seedMenus } from '@/data/seedMenus';
import { seedIngredients } from '@/data/seedIngredients';
import { getCurrentWeekInfo, shouldResetChecklist, getCurrentISOString, getInitialWeekIndex, getWeekInfoByIndex } from '@/utils/dateUtils';
import { getWeekIngredients } from '@/utils/shoppingUtils';

interface AppStore extends AppState {
  // State for selected week navigation
  selectedWeekIndex: 0 | 1 | 2 | 3;
  
  // Actions
  setCurrentTab: (tab: 'menu' | 'shopping') => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleShoppingItem: (itemId: string) => void;
  resetShoppingList: () => void;
  markAllShoppingItems: () => void;
  initializeApp: () => void;
  checkAndResetWeek: () => void;
  
  // Week navigation actions
  setSelectedWeek: (weekIndex: 0 | 1 | 2 | 3) => void;
  navigateToNextWeek: () => void;
  navigateToPreviousWeek: () => void;
  resetToCurrentWeek: () => void;
  
  // Computed values
  getCurrentWeek: () => ReturnType<typeof getCurrentWeekInfo>;
  getSelectedWeek: () => ReturnType<typeof getWeekInfoByIndex>;
  getCurrentWeekMenu: () => typeof seedMenus[0];
  getSelectedWeekMenu: () => typeof seedMenus[0];
  getCurrentShoppingItems: () => ReturnType<typeof getWeekIngredients>;
  getSelectedShoppingItems: () => ReturnType<typeof getWeekIngredients>;
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
      selectedWeekIndex: getInitialWeekIndex(39), // Initialize with initial week logic
      settings: {
        baseWeek: 39, // Week 39 of 2024 as default starting point
        showNavigation: true, // Enable navigation for week switching
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

      // Week navigation actions
      setSelectedWeek: (weekIndex) => {
        set({ selectedWeekIndex: weekIndex });
      },

      navigateToNextWeek: () => {
        set((state) => ({
          selectedWeekIndex: ((state.selectedWeekIndex + 1) % 4) as 0 | 1 | 2 | 3
        }));
      },

      navigateToPreviousWeek: () => {
        set((state) => ({
          selectedWeekIndex: ((state.selectedWeekIndex - 1 + 4) % 4) as 0 | 1 | 2 | 3
        }));
      },

      resetToCurrentWeek: () => {
        const { settings } = get();
        const initialWeekIndex = getInitialWeekIndex(settings.baseWeek);
        set({ selectedWeekIndex: initialWeekIndex });
      },

      // Computed values
      getCurrentWeek: () => {
        const { settings } = get();
        return getCurrentWeekInfo(settings.baseWeek);
      },

      getSelectedWeek: () => {
        const { selectedWeekIndex, settings } = get();
        return getWeekInfoByIndex(selectedWeekIndex, settings.baseWeek);
      },

      getCurrentWeekMenu: () => {
        const { weekState } = get();
        return seedMenus[weekState.weekIndex];
      },

      getSelectedWeekMenu: () => {
        const { selectedWeekIndex } = get();
        return seedMenus[selectedWeekIndex];
      },

      getCurrentShoppingItems: () => {
        const currentWeekMenu = get().getCurrentWeekMenu();
        return getWeekIngredients(currentWeekMenu);
      },

      getSelectedShoppingItems: () => {
        const selectedWeekMenu = get().getSelectedWeekMenu();
        return getWeekIngredients(selectedWeekMenu);
      }
    }),
    {
      name: getStorageKey(getHouseholdId(), 'appState'),
      storage: createJSONStorage(() => localStorage),
      // Only persist certain parts of the state
      partialize: (state) => ({
        settings: state.settings,
        weekState: state.weekState,
        currentTab: state.currentTab,
        selectedWeekIndex: state.selectedWeekIndex
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
