import { ShoppingItem, WeekMenu, GroupedShoppingItems, ShoppingProgress } from '@/types';
import { seedIngredients, dishToIngredients } from '@/data/seedIngredients';

/**
 * Get all ingredients for a specific week menu
 */
export function getWeekIngredients(weekMenu: WeekMenu): ShoppingItem[] {
  const ingredientIds = new Set<string>();
  
  // Collect all ingredient IDs from all dishes in the week
  Object.values(weekMenu.days).forEach(dish => {
    // Add ingredients for garnish
    const garnishIngredients = dishToIngredients[dish.garnish.id] || [];
    garnishIngredients.forEach(id => ingredientIds.add(id));
    
    // Add ingredients for protein
    const proteinIngredients = dishToIngredients[dish.protein.id] || [];
    proteinIngredients.forEach(id => ingredientIds.add(id));
    
    // Add ingredients for veggies
    const veggiesIngredients = dishToIngredients[dish.veggies.id] || [];
    veggiesIngredients.forEach(id => ingredientIds.add(id));
  });
  
  // Convert ingredient IDs to ShoppingItem objects
  const ingredients = Array.from(ingredientIds)
    .map(id => seedIngredients.find(ingredient => ingredient.id === id))
    .filter((ingredient): ingredient is ShoppingItem => ingredient !== undefined);
  
  // Sort by category and then by name
  return ingredients.sort((a, b) => {
    if (a.category !== b.category) {
      return getCategoryOrder(a.category) - getCategoryOrder(b.category);
    }
    return a.name.localeCompare(b.name, 'ru');
  });
}

/**
 * Group shopping items by category
 */
export function groupShoppingItems(
  items: ShoppingItem[], 
  checkedItems: Record<string, boolean>
): GroupedShoppingItems {
  const grouped: GroupedShoppingItems = {};
  
  items.forEach(item => {
    const categoryName = getCategoryDisplayName(item.category);
    
    if (!grouped[categoryName]) {
      grouped[categoryName] = {
        items: [],
        checked: 0,
        total: 0
      };
    }
    
    grouped[categoryName].items.push(item);
    grouped[categoryName].total++;
    
    if (checkedItems[item.id]) {
      grouped[categoryName].checked++;
    }
  });
  
  return grouped;
}

/**
 * Calculate shopping progress
 */
export function calculateShoppingProgress(
  items: ShoppingItem[], 
  checkedItems: Record<string, boolean>
): ShoppingProgress {
  const total = items.length;
  const completed = items.filter(item => checkedItems[item.id]).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { total, completed, percentage };
}

/**
 * Get category display name in Russian
 */
function getCategoryDisplayName(category: string): string {
  const categoryNames: Record<string, string> = {
    meat: 'Мясо',
    fish: 'Рыба',
    grains: 'Крупы',
    vegetables: 'Овощи',
    fruits: 'Фрукты',
    dairy_eggs: 'Молочка/яйца',
    canned: 'Консервы',
    sauces: 'Соусы',
    spices: 'Специи',
    other: 'Прочее'
  };
  
  return categoryNames[category] || 'Прочее';
}

/**
 * Get category order for sorting
 */
function getCategoryOrder(category: string): number {
  const categoryOrder: Record<string, number> = {
    meat: 1,
    fish: 2,
    grains: 3,
    vegetables: 4,
    fruits: 5,
    dairy_eggs: 6,
    canned: 7,
    sauces: 8,
    spices: 9,
    other: 10
  };
  
  return categoryOrder[category] || 99;
}

/**
 * Reset all checklist items
 */
export function resetChecklist(items: ShoppingItem[]): Record<string, boolean> {
  const resetChecklist: Record<string, boolean> = {};
  items.forEach(item => {
    resetChecklist[item.id] = false;
  });
  return resetChecklist;
}

/**
 * Mark all items as checked
 */
export function checkAllItems(items: ShoppingItem[]): Record<string, boolean> {
  const allChecked: Record<string, boolean> = {};
  items.forEach(item => {
    allChecked[item.id] = true;
  });
  return allChecked;
}
