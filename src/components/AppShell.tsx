import React, { useEffect, useCallback, useRef } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { useAppStore } from '@/store/appStore';
import WeekHeader from './WeekHeader';
import MenuView from './MenuView';
import ShoppingView from './ShoppingView';

const AppShell: React.FC = () => {
  const { isReady, isTelegram, hapticFeedback } = useTelegram();
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const shoppingScrollRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef<Record<string, number>>({ menu: 0, shopping: 0 });
  const hasInitiallyLoaded = useRef<boolean>(false);
  const isFirstMenuLoad = useRef<boolean>(true);
  
  // Split store selectors to avoid unnecessary re-renders
  const currentTab = useAppStore(state => state.currentTab);
  const setCurrentTab = useAppStore(state => state.setCurrentTab);
  const initializeApp = useAppStore(state => state.initializeApp);



  // Save scroll position when tab changes
  const saveScrollPosition = useCallback((tab: 'menu' | 'shopping') => {
    const scrollRef = tab === 'menu' ? menuScrollRef : shoppingScrollRef;
    if (scrollRef.current) {
      scrollPositions.current[tab] = scrollRef.current.scrollTop;
    }
  }, []);

  // Handle auto-scroll callback from MenuView
  const handleMenuAutoScroll = useCallback((scrollTop: number) => {
    // Update the saved scroll position for menu tab after auto-scroll
    scrollPositions.current.menu = scrollTop;
    // Mark that first menu load and auto-scroll is complete
    isFirstMenuLoad.current = false;
  }, []);

  // Restore scroll position for current tab
  const restoreScrollPosition = useCallback((tab: 'menu' | 'shopping') => {
    const scrollRef = tab === 'menu' ? menuScrollRef : shoppingScrollRef;
    if (scrollRef.current) {
      const savedPosition = scrollPositions.current[tab];
      // Always restore saved position, except for first menu load which will auto-scroll
      const shouldRestore = tab === 'shopping' || (tab === 'menu' && !isFirstMenuLoad.current);
      
      if (shouldRestore) {
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = savedPosition;
          }
        });
      }
    }
  }, []);

  // Handle tab switching with scroll position management
  const handleTabSwitch = useCallback((newTab: 'menu' | 'shopping') => {
    // Save current tab's scroll position
    saveScrollPosition(currentTab);
    
    // Switch tab
    hapticFeedback('selection');
    setCurrentTab(newTab);
  }, [currentTab, saveScrollPosition, hapticFeedback, setCurrentTab]);

  // Restore scroll position when tab changes
  useEffect(() => {
    restoreScrollPosition(currentTab);
  }, [currentTab, restoreScrollPosition]);

  // Initialize app on mount
  useEffect(() => {
    if (isReady && !hasInitiallyLoaded.current) {
      initializeApp();
      hasInitiallyLoaded.current = true;
    }
  }, [isReady, initializeApp]);


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
              onClick={() => handleTabSwitch('menu')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                currentTab === 'menu'
                  ? 'text-tg-button border-b-2 border-tg-button'
                  : 'text-tg-hint hover:text-tg-text'
              }`}
            >
              Меню
            </button>
            <button
              onClick={() => handleTabSwitch('shopping')}
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
        <main className="container mx-auto max-w-2xl relative">
          {/* Menu Tab Content */}
          <div
            ref={menuScrollRef}
            data-scroll-container
            className={`px-4 py-6 pb-safe-bottom overflow-y-auto ${
              currentTab === 'menu' ? 'block' : 'hidden'
            }`}
            style={{ height: 'calc(100vh - 120px)' }}
          >
            <MenuView 
              scrollContainerRef={menuScrollRef}
              onAutoScroll={handleMenuAutoScroll}
              shouldAutoScroll={isFirstMenuLoad.current}
              resetAutoScroll={currentTab === 'menu' && isFirstMenuLoad.current}
            />
          </div>

          {/* Shopping Tab Content */}
          <div
            ref={shoppingScrollRef}
            data-scroll-container
            className={`px-4 py-6 pb-safe-bottom overflow-y-auto ${
              currentTab === 'shopping' ? 'block' : 'hidden'
            }`}
            style={{ height: 'calc(100vh - 120px)' }}
          >
            <ShoppingView />
          </div>
        </main>
      </div>

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-0 left-0 bg-black/80 text-white text-xs p-2 z-50">
            <div>Telegram: {isTelegram ? 'Yes' : 'No'}</div>
            <div>Tab: {currentTab}</div>
            <div>First Menu Load: {isFirstMenuLoad.current ? 'Yes' : 'No'}</div>
            <div>Menu Scroll: {scrollPositions.current.menu}</div>
            <div>Shopping Scroll: {scrollPositions.current.shopping}</div>
          </div>
        )}
    </div>
  );
};

export default AppShell;
