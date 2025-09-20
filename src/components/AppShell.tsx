import React, { useEffect, useMemo, useCallback } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { useAppStore } from '@/store/appStore';
import WeekHeader from './WeekHeader';
import MenuView from './MenuView';
import ShoppingView from './ShoppingView';

const AppShell: React.FC = () => {
  const { isReady, isTelegram, showMainButton, hideMainButton, hapticFeedback } = useTelegram();
  
  // Split store selectors to avoid unnecessary re-renders
  const currentTab = useAppStore(state => state.currentTab);
  const weekStateChecklist = useAppStore(state => state.weekState.checklist);
  const setCurrentTab = useAppStore(state => state.setCurrentTab);
  const initializeApp = useAppStore(state => state.initializeApp);
  const markAllShoppingItems = useAppStore(state => state.markAllShoppingItems);
  const resetShoppingList = useAppStore(state => state.resetShoppingList);
  const getCurrentShoppingItems = useAppStore(state => state.getCurrentShoppingItems);

  // Memoize shopping items to prevent recalculation on every render
  const shoppingItems = useMemo(() => {
    return getCurrentShoppingItems();
  }, [getCurrentShoppingItems]);

  // Memoize shopping progress calculation
  const shoppingProgress = useMemo(() => {
    const totalItems = shoppingItems.length;
    const checkedItems = shoppingItems.filter(item => weekStateChecklist[item.id]).length;
    const isAllChecked = totalItems > 0 && checkedItems === totalItems;
    
    return { totalItems, checkedItems, isAllChecked };
  }, [shoppingItems, weekStateChecklist]);

  // Stable callbacks to prevent useEffect re-runs
  const handleOpenShopping = useCallback(() => {
    hapticFeedback('light');
    setCurrentTab('shopping');
  }, [hapticFeedback, setCurrentTab]);

  const handleMarkAll = useCallback(() => {
    hapticFeedback('success');
    markAllShoppingItems();
  }, [hapticFeedback, markAllShoppingItems]);

  const handleResetList = useCallback(() => {
    hapticFeedback('medium');
    resetShoppingList();
  }, [hapticFeedback, resetShoppingList]);

  // Initialize app on mount
  useEffect(() => {
    if (isReady) {
      initializeApp();
    }
  }, [isReady, initializeApp]);

  // Update MainButton based on current tab - with minimal dependencies
  useEffect(() => {
    if (!isReady) return;

    if (currentTab === 'menu') {
      showMainButton('Открыть список покупок', handleOpenShopping);
    } else if (currentTab === 'shopping') {
      if (shoppingProgress.isAllChecked) {
        showMainButton('Сбросить отметки', handleResetList);
      } else {
        showMainButton('Отметить всё купленным', handleMarkAll);
      }
    }

    return () => {
      hideMainButton();
    };
  }, [
    isReady, 
    currentTab, 
    shoppingProgress.isAllChecked,
    showMainButton, 
    hideMainButton,
    handleOpenShopping,
    handleMarkAll,
    handleResetList
  ]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-tg-bg text-tg-text flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tg-button mx-auto mb-4"></div>
          <p className="text-tg-hint">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text">
      {/* Safe area top padding for iOS */}
      <div className="pt-safe-top">
        <WeekHeader />
        
        {/* Tab Navigation */}
        <div className="sticky top-0 z-10 bg-tg-bg border-b border-tg-hint/20">
          <div className="flex">
            <button
              onClick={() => {
                hapticFeedback('selection');
                setCurrentTab('menu');
              }}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                currentTab === 'menu'
                  ? 'text-tg-button border-b-2 border-tg-button'
                  : 'text-tg-hint hover:text-tg-text'
              }`}
            >
              Меню
            </button>
            <button
              onClick={() => {
                hapticFeedback('selection');
                setCurrentTab('shopping');
              }}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                currentTab === 'shopping'
                  ? 'text-tg-button border-b-2 border-tg-button'
                  : 'text-tg-hint hover:text-tg-text'
              }`}
            >
              Покупки
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 pb-safe-bottom max-w-2xl">
          {currentTab === 'menu' ? <MenuView /> : <ShoppingView />}
        </main>
      </div>

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 left-0 bg-black/80 text-white text-xs p-2 z-50">
          <div>Telegram: {isTelegram ? 'Yes' : 'No'}</div>
          <div>Tab: {currentTab}</div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
