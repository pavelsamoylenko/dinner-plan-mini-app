import { ShoppingItem } from '@/types';

export const seedIngredients: ShoppingItem[] = [
  // Мясо
  { id: 'chicken-breast', name: 'Куриная грудка', category: 'meat' },
  { id: 'chicken-thighs', name: 'Куриные бёдра', category: 'meat' },
  { id: 'chicken-wings', name: 'Куриные крылья', category: 'meat' },
  { id: 'chicken-whole', name: 'Курица', category: 'meat' },
  { id: 'beef-mince', name: 'Говяжий фарш', category: 'meat' },
  { id: 'beef-steak', name: 'Стейк говядины', category: 'meat' },
  { id: 'beef-pieces', name: 'Говядина кусочками', category: 'meat' },
  { id: 'pork-pieces', name: 'Свинина кусочками', category: 'meat' },
  { id: 'pork-schnitzel', name: 'Свинина для шницеля', category: 'meat' },
  { id: 'ham', name: 'Ветчина', category: 'meat' },

  // Рыба
  { id: 'salmon-fillet', name: 'Филе лосося', category: 'fish' },
  { id: 'salmon-trout', name: 'Лосось/форель', category: 'fish' },
  { id: 'cod-fillet', name: 'Филе трески', category: 'fish' },
  { id: 'mackerel', name: 'Скумбрия', category: 'fish' },
  { id: 'white-fish', name: 'Белая рыба', category: 'fish' },
  { id: 'fish-for-batter', name: 'Рыба для кляра', category: 'fish' },

  // Крупы и гарниры
  { id: 'buckwheat', name: 'Гречка', category: 'grains' },
  { id: 'rice', name: 'Рис', category: 'grains' },
  { id: 'bulgur', name: 'Булгур', category: 'grains' },
  { id: 'pasta', name: 'Паста', category: 'grains' },
  { id: 'noodles', name: 'Лапша', category: 'grains' },
  { id: 'potatoes', name: 'Картофель', category: 'vegetables' },

  // Овощи
  { id: 'cucumbers', name: 'Огурцы', category: 'vegetables' },
  { id: 'tomatoes', name: 'Помидоры', category: 'vegetables' },
  { id: 'bell-peppers', name: 'Болгарский перец', category: 'vegetables' },
  { id: 'broccoli', name: 'Брокколи', category: 'vegetables' },
  { id: 'zucchini', name: 'Кабачки', category: 'vegetables' },
  { id: 'eggplant', name: 'Баклажаны', category: 'vegetables' },
  { id: 'cabbage', name: 'Капуста', category: 'vegetables' },
  { id: 'carrots', name: 'Морковь', category: 'vegetables' },
  { id: 'onions', name: 'Лук', category: 'vegetables' },
  { id: 'mushrooms', name: 'Грибы', category: 'vegetables' },
  { id: 'lettuce', name: 'Салатные листья', category: 'vegetables' },
  { id: 'spinach', name: 'Шпинат', category: 'vegetables' },
  { id: 'greens', name: 'Зелень', category: 'vegetables' },

  // Молочка и яйца
  { id: 'eggs', name: 'Яйца', category: 'dairy_eggs' },
  { id: 'cream', name: 'Сливки', category: 'dairy_eggs' },
  { id: 'milk', name: 'Молоко', category: 'dairy_eggs' },
  { id: 'butter', name: 'Сливочное масло', category: 'dairy_eggs' },

  // Консервы и соусы
  { id: 'canned-beans', name: 'Фасоль консервированная', category: 'canned' },
  { id: 'canned-tomatoes', name: 'Томаты в собственном соку', category: 'canned' },
  { id: 'tomato-sauce', name: 'Томатный соус', category: 'sauces' },
  { id: 'soy-sauce', name: 'Соевый соус', category: 'sauces' },
  { id: 'teriyaki-sauce', name: 'Соус терияки', category: 'sauces' },
  { id: 'cream-sauce', name: 'Сливочный соус', category: 'sauces' },
  { id: 'lemon-juice', name: 'Лимонный сок', category: 'sauces' },
  { id: 'mustard', name: 'Горчица', category: 'sauces' },

  // Специи и прочее
  { id: 'paprika', name: 'Паприка', category: 'spices' },
  { id: 'vegetable-oil', name: 'Растительное масло', category: 'spices' },
  { id: 'olive-oil', name: 'Оливковое масло', category: 'spices' },
  { id: 'spices-mix', name: 'Специи', category: 'spices' },
  { id: 'salt', name: 'Соль', category: 'spices' },
  { id: 'pepper', name: 'Перец', category: 'spices' },
  { id: 'flour', name: 'Мука', category: 'other' },
  { id: 'breadcrumbs', name: 'Панировочные сухари', category: 'other' }
];

// Mapping of dishes to their ingredients
export const dishToIngredients: Record<string, string[]> = {
  // Week 1
  'chicken-breast': ['chicken-breast', 'vegetable-oil', 'spices-mix'],
  'buckwheat': ['buckwheat'],
  'cucumber-tomato-salad': ['cucumbers', 'tomatoes', 'vegetable-oil'],
  'chicken-thighs': ['chicken-thighs', 'spices-mix'],
  'mashed-potatoes': ['potatoes', 'milk', 'butter'],
  'cabbage-salad': ['cabbage', 'vegetable-oil'],
  'chicken-teriyaki': ['chicken-whole', 'teriyaki-sauce'],
  'rice': ['rice'],
  'pepper-broccoli': ['bell-peppers', 'broccoli', 'vegetable-oil'],
  'beef-mince': ['beef-mince', 'onions', 'tomato-sauce'],
  'pasta': ['pasta'],
  'fresh-salad': ['lettuce', 'cucumbers', 'tomatoes', 'vegetable-oil'],
  'beef-steak': ['beef-steak', 'spices-mix', 'vegetable-oil'],
  'bulgur': ['bulgur'],
  'baked-zucchini-peppers': ['zucchini', 'bell-peppers', 'olive-oil'],
  'salmon-fillet': ['salmon-fillet', 'lemon-juice'],
  'baked-potatoes': ['potatoes', 'olive-oil'],
  'pork-pieces': ['pork-pieces', 'onions', 'vegetable-oil'],

  // Week 2
  'pasta-noodles': ['pasta'],
  'pork-soy-sauce': ['pork-pieces', 'soy-sauce', 'vegetable-oil'],
  'carrot-cabbage-pepper': ['carrots', 'cabbage', 'bell-peppers', 'vegetable-oil'],
  'pork-schnitzel': ['pork-schnitzel', 'flour', 'breadcrumbs', 'eggs'],
  'fried-mackerel': ['mackerel', 'vegetable-oil', 'spices-mix'],
  'fish-batter': ['fish-for-batter', 'flour', 'eggs', 'vegetable-oil'],
  'steamed-broccoli-carrot': ['broccoli', 'carrots'],
  'chili-con-carne': ['beef-mince', 'canned-beans', 'canned-tomatoes', 'onions', 'spices-mix'],
  'greens': ['greens'],
  'chicken-paprika': ['chicken-whole', 'paprika', 'vegetable-oil'],
  'cucumber-greens': ['cucumbers', 'greens', 'vegetable-oil'],
  'chicken-vegetables': ['chicken-whole', 'bell-peppers', 'broccoli', 'cream', 'tomato-sauce'],
  'leaf-salad': ['lettuce', 'vegetable-oil'],

  // Week 3
  'cod-fillet': ['cod-fillet', 'lemon-juice', 'spices-mix'],
  'beef-pieces': ['beef-pieces', 'vegetable-oil', 'spices-mix'],
  'baked-eggplant-pepper-zucchini': ['eggplant', 'bell-peppers', 'zucchini', 'olive-oil'],
  'chicken-wings': ['chicken-wings', 'spices-mix', 'vegetable-oil'],
  'pork-onion': ['pork-pieces', 'onions', 'vegetable-oil'],
  'carrot-cabbage-salad': ['carrots', 'cabbage', 'vegetable-oil'],
  'white-fish-pan': ['white-fish', 'vegetable-oil', 'spices-mix'],
  'pasta-beef-vegetables': ['pasta', 'beef-pieces', 'bell-peppers', 'tomato-sauce'],
  'vegetable-stew-chicken': ['chicken-whole', 'potatoes', 'carrots', 'onions', 'bell-peppers'],

  // Week 4
  'salmon-trout': ['salmon-trout', 'vegetable-oil', 'lemon-juice'],
  'beef-meatballs-tomato': ['beef-mince', 'eggs', 'breadcrumbs', 'tomato-sauce'],
  'pork-stewed-vegetables': ['pork-pieces', 'potatoes', 'carrots', 'onions', 'bell-peppers'],
  'chicken-cream-sauce': ['chicken-whole', 'cream', 'mushrooms', 'vegetable-oil'],
  'baked-fish': ['mackerel', 'vegetable-oil', 'spices-mix'],
  'steamed-vegetables': ['broccoli', 'carrots'],
  'omelet-vegetables-ham': ['eggs', 'ham', 'bell-peppers', 'onions', 'butter'],
  'vegetable-stew-beef': ['beef-pieces', 'potatoes', 'carrots', 'onions', 'bell-peppers', 'tomato-sauce']
};
