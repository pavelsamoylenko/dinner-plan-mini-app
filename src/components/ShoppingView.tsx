import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/appStore';
import { useTelegram } from '@/hooks/useTelegram';
import { groupShoppingItems, calculateShoppingProgress } from '@/utils/shoppingUtils';
import { ChevronDown, ChevronRight, ShoppingCart, RotateCcw } from 'lucide-react';

const ShoppingView: React.FC = () => {
  const { 
    getCurrentShoppingItems, 
    weekState, 
    toggleShoppingItem,
    markAllShoppingItems,
    resetShoppingList
  } = useAppStore();
  
  const { hapticFeedback } = useTelegram();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Мясо', 'Рыба', 'Крупы']));
  const [undoState, setUndoState] = useState<{ 
    show: boolean; 
    action: 'check' | 'uncheck' | null;
    previousChecklist: Record<string, boolean> | null;
    timeLeft: number;
  }>({ show: false, action: null, previousChecklist: null, timeLeft: 5 });
  
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  
  const shoppingItems = getCurrentShoppingItems();
  const groupedItems = groupShoppingItems(shoppingItems, weekState.checklist);
  const progress = calculateShoppingProgress(shoppingItems, weekState.checklist);

  const toggleCategory = (category: string) => {
    hapticFeedback('selection');
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleItemToggle = (itemId: string) => {
    hapticFeedback('light');
    toggleShoppingItem(itemId);
  };

  // Clear undo timers
  const clearUndoTimers = () => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  // Handle undo
  const handleUndo = () => {
    if (undoState.previousChecklist !== null) {
      hapticFeedback('success');
      
      // Get all current items
      const currentItems = getCurrentShoppingItems();
      
      // Restore each item to its previous state
      currentItems.forEach(item => {
        const wasChecked = undoState.previousChecklist![item.id] || false;
        const isChecked = weekState.checklist[item.id] || false;
        
        if (wasChecked !== isChecked) {
          toggleShoppingItem(item.id);
        }
      });
      
      clearUndoTimers();
      setUndoState({ show: false, action: null, previousChecklist: null, timeLeft: 5 });
    }
  };

  // Show undo with timer
  const showUndoWithTimer = (action: 'check' | 'uncheck', previousChecklist: Record<string, boolean>) => {
    clearUndoTimers();
    
    setUndoState({ 
      show: true, 
      action, 
      previousChecklist,
      timeLeft: 5 
    });

    // Countdown timer
    let timeLeft = 5;
    countdownRef.current = setInterval(() => {
      timeLeft -= 1;
      setUndoState(prev => ({ ...prev, timeLeft }));
      
      if (timeLeft <= 0) {
        clearUndoTimers();
        setUndoState({ show: false, action: null, previousChecklist: null, timeLeft: 5 });
      }
    }, 1000);

    // Auto-hide after 5 seconds
    undoTimerRef.current = setTimeout(() => {
      clearUndoTimers();
      setUndoState({ show: false, action: null, previousChecklist: null, timeLeft: 5 });
    }, 5000);
  };

  // Handle smart toggle button
  const handleSmartToggle = () => {
    // Save current state BEFORE any action
    const previousChecklist = { ...weekState.checklist };
    
    if (progress.percentage === 100) {
      // Uncheck all
      hapticFeedback('medium');
      resetShoppingList();
      showUndoWithTimer('uncheck', previousChecklist);
    } else {
      // Check all
      hapticFeedback('success');
      markAllShoppingItems();
      showUndoWithTimer('check', previousChecklist);
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearUndoTimers();
    };
  }, []);

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Мясо': '🥩',
      'Рыба': '🐟',
      'Крупы': '🌾',
      'Овощи': '🥬',
      'Фрукты': '🍎',
      'Молочка/яйца': '🥛',
      'Консервы': '🥫',
      'Соусы': '🍯',
      'Специи': '🧂',
      'Прочее': '📦'
    };
    return icons[category] || '📦';
  };

  if (shoppingItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="w-12 h-12 text-tg-hint mx-auto mb-4" />
        <h3 className="text-lg font-medium text-tg-text mb-2">
          Список покупок пуст
        </h3>
        <p className="text-tg-hint">
          Не удалось загрузить ингредиенты для текущей недели
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 pb-20">
        {/* Header with progress */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-tg-text mb-4">
            Список покупок
          </h2>
          
          {/* Progress bar */}
          <div className="bg-tg-secondary-bg rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-tg-hint">Прогресс</span>
              <span className="text-sm font-medium text-tg-text">
                {progress.completed} из {progress.total}
              </span>
            </div>
            
            <div className="w-full bg-tg-bg rounded-full h-2">
              <div 
                className="bg-tg-button h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            
            <div className="text-center mt-2">
              <span className="text-lg font-semibold text-tg-button">
                {progress.percentage}%
              </span>
            </div>
          </div>
        </div>

      {/* Shopping categories */}
      <div className="space-y-3">
        {Object.entries(groupedItems).map(([category, data]) => {
          const isExpanded = expandedCategories.has(category);
          const categoryProgress = data.total > 0 ? Math.round((data.checked / data.total) * 100) : 0;
          
          return (
            <div key={category} className="bg-tg-secondary-bg rounded-lg overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-tg-bg/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <div className="text-left">
                    <h3 className="font-medium text-tg-text">
                      {category}
                    </h3>
                    <p className="text-xs text-tg-hint">
                      {data.checked}/{data.total} • {categoryProgress}%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-2 bg-tg-bg rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-tg-button transition-all duration-300"
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-tg-hint" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-tg-hint" />
                  )}
                </div>
              </button>

              {/* Category items */}
              {isExpanded && (
                <div className="border-t border-tg-hint/10">
                  {data.items.map((item) => {
                    const isChecked = weekState.checklist[item.id];
                    
                    return (
                      <label
                        key={item.id}
                        className="flex items-center p-3 hover:bg-tg-bg/30 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleItemToggle(item.id)}
                          className="sr-only"
                        />
                        
                        {/* Custom checkbox */}
                        <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                          isChecked 
                            ? 'bg-tg-button border-tg-button' 
                            : 'border-tg-hint hover:border-tg-button'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Item name */}
                        <span className={`flex-1 text-sm transition-colors ${
                          isChecked 
                            ? 'text-tg-hint line-through' 
                            : 'text-tg-text'
                        }`}>
                          {item.name}
                          {item.qty && (
                            <span className="text-xs text-tg-hint ml-2">
                              ({item.qty})
                            </span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

        {/* Progress summary */}
        {progress.total > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-tg-hint">
              {progress.percentage === 100 
                ? '🎉 Все покупки сделаны!' 
                : `Осталось купить: ${progress.total - progress.completed} позиций`
              }
            </p>
          </div>
        )}
      </div>

      {/* Fixed bottom button */}
      {progress.total > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30">
          <div className="container mx-auto max-w-2xl px-4">
            <button
              onClick={handleSmartToggle}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all shadow-lg ${
                progress.percentage === 100
                  ? 'bg-tg-secondary-bg text-tg-text border border-tg-hint/20'
                  : 'bg-tg-button text-tg-button-text'
              }`}
            >
              {progress.percentage === 100 ? '🔄 Сбросить всё' : '✅ Отметить всё'}
            </button>
          </div>
        </div>
      )}

      {/* Undo notification */}
      {undoState.show && (
        <div className="fixed bottom-20 left-4 right-4 z-40 animate-in slide-in-from-bottom-2">
          <div className="container mx-auto max-w-2xl px-4">
            <div className="bg-tg-secondary-bg rounded-lg shadow-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-tg-hint" />
                <span className="text-sm text-tg-text">
                  {undoState.action === 'check' ? 'Все товары отмечены' : 'Список сброшен'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-tg-hint">{undoState.timeLeft}с</span>
                <button
                  onClick={handleUndo}
                  className="px-3 py-1 bg-tg-button text-tg-button-text rounded text-sm font-medium"
                >
                  Отменить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingView;
