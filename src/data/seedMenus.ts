import { WeekMenu } from '@/types';

export const seedMenus: WeekMenu[] = [
  {
    id: 'week-1',
    title: 'Неделя 1',
    days: {
      1: { // Monday
        garnish: { id: 'buckwheat', name: 'Гречка' },
        protein: { id: 'chicken-breast', name: 'Куриная грудка' },
        veggies: { id: 'cucumber-tomato-salad', name: 'Салат огурцы+помидоры' }
      },
      2: { // Tuesday  
        garnish: { id: 'mashed-potatoes', name: 'Картофельное пюре' },
        protein: { id: 'chicken-thighs', name: 'Куриные бёдра' },
        veggies: { id: 'cabbage-salad', name: 'Салат из капусты' }
      },
      3: { // Wednesday
        garnish: { id: 'rice', name: 'Рис' },
        protein: { id: 'chicken-teriyaki', name: 'Курица терияки' },
        veggies: { id: 'pepper-broccoli', name: 'Перец+брокколи' }
      },
      4: { // Thursday
        garnish: { id: 'pasta', name: 'Паста' },
        protein: { id: 'beef-mince', name: 'Говяжий фарш' },
        veggies: { id: 'fresh-salad', name: 'Салат свежий' }
      },
      5: { // Friday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'beef-steak', name: 'Стейк говядины' },
        veggies: { id: 'baked-zucchini-peppers', name: 'Запеч. кабачки+перцы' }
      },
      6: { // Saturday
        garnish: { id: 'mashed-potatoes', name: 'Пюре' },
        protein: { id: 'salmon-fillet', name: 'Лосось филе' },
        veggies: { id: 'cucumbers', name: 'Огурцы' }
      },
      7: { // Sunday
        garnish: { id: 'baked-potatoes', name: 'Запеч. картофель' },
        protein: { id: 'pork-pieces', name: 'Свинина кусочками' },
        veggies: { id: 'cucumber-salad', name: 'Салат огурцы' }
      }
    }
  },
  {
    id: 'week-2',
    title: 'Неделя 2',
    days: {
      1: { // Monday
        garnish: { id: 'pasta-noodles', name: 'Паста/лапша' },
        protein: { id: 'pork-soy-sauce', name: 'Свинина в соевом соусе' },
        veggies: { id: 'carrot-cabbage-pepper', name: 'Морковь+капуста+перец' }
      },
      2: { // Tuesday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'pork-schnitzel', name: 'Шницель свиной' },
        veggies: { id: 'cabbage-salad', name: 'Салат из капусты' }
      },
      3: { // Wednesday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'fried-mackerel', name: 'Скумбрия жареная' },
        veggies: { id: 'cabbage-salad', name: 'Салат из капусты' }
      },
      4: { // Thursday
        garnish: { id: 'pasta', name: 'Паста' },
        protein: { id: 'fish-batter', name: 'Рыба в кляре' },
        veggies: { id: 'steamed-broccoli-carrot', name: 'Овощи на пару: брокколи+морковь' }
      },
      5: { // Friday
        garnish: { id: 'rice', name: 'Рис' },
        protein: { id: 'chili-con-carne', name: 'Чили кон карне' },
        veggies: { id: 'greens', name: 'Зелень' }
      },
      6: { // Saturday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'chicken-paprika', name: 'Курица с паприкой' },
        veggies: { id: 'cucumber-greens', name: 'Огурцы+зелень' }
      },
      7: { // Sunday
        garnish: { id: 'pasta-creamy-tomato', name: 'Паста с курицей и овощами' },
        protein: { id: 'chicken-vegetables', name: 'Сливочно-томатный' },
        veggies: { id: 'leaf-salad', name: 'Салат из листьев' }
      }
    }
  },
  {
    id: 'week-3',
    title: 'Неделя 3',
    days: {
      1: { // Monday
        garnish: { id: 'mashed-potatoes', name: 'Пюре' },
        protein: { id: 'cod-fillet', name: 'Треска филе' },
        veggies: { id: 'cucumbers', name: 'Огурцы' }
      },
      2: { // Tuesday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'beef-pieces', name: 'Говядина кусочками' },
        veggies: { id: 'baked-eggplant-pepper-zucchini', name: 'Запеч. баклажан+перец+кабачок' }
      },
      3: { // Wednesday
        garnish: { id: 'buckwheat', name: 'Гречка' },
        protein: { id: 'chicken-wings', name: 'Куриные крылья' },
        veggies: { id: 'fresh-salad', name: 'Салат свежий' }
      },
      4: { // Thursday
        garnish: { id: 'rice', name: 'Рис' },
        protein: { id: 'pork-onion', name: 'Свинина с луком' },
        veggies: { id: 'carrot-cabbage-salad', name: 'Салат морковь+капуста' }
      },
      5: { // Friday
        garnish: { id: 'buckwheat', name: 'Гречка' },
        protein: { id: 'white-fish-pan', name: 'Белая рыба на сковороде' },
        veggies: { id: 'cucumber-greens', name: 'Огурцы+зелень' }
      },
      6: { // Saturday
        garnish: { id: 'pasta-beef-vegetables', name: 'Паста с говядиной и овощами' },
        protein: { id: 'tomato-sauce', name: 'Томатный' },
        veggies: { id: 'mixed-vegetables', name: 'Овощи' }
      },
      7: { // Sunday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'vegetable-stew-chicken', name: 'Овощное рагу с курицей' },
        veggies: { id: 'mixed-vegetables', name: 'Овощи' }
      }
    }
  },
  {
    id: 'week-4',
    title: 'Неделя 4',
    days: {
      1: { // Monday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'salmon-trout', name: 'Лосось/форель' },
        veggies: { id: 'leaf-salad', name: 'Салат листовой' }
      },
      2: { // Tuesday
        garnish: { id: 'mashed-potatoes', name: 'Пюре' },
        protein: { id: 'beef-meatballs-tomato', name: 'Говяжьи тефтели в томатном' },
        veggies: { id: 'cucumber-salad', name: 'Салат огурцы' }
      },
      3: { // Wednesday
        garnish: { id: 'buckwheat', name: 'Гречка' },
        protein: { id: 'pork-stewed-vegetables', name: 'Свинина тушёная с овощами' },
        veggies: { id: 'mixed-vegetables', name: 'Овощи' }
      },
      4: { // Thursday
        garnish: { id: 'pasta', name: 'Паста' },
        protein: { id: 'chicken-cream-sauce', name: 'Курица в сливочном' },
        veggies: { id: 'fresh-salad', name: 'Салат свежий' }
      },
      5: { // Friday
        garnish: { id: 'rice', name: 'Рис' },
        protein: { id: 'baked-fish', name: 'Хек/скумбрия в духовке' },
        veggies: { id: 'steamed-vegetables', name: 'Овощи на пару' }
      },
      6: { // Saturday
        garnish: { id: 'potatoes', name: 'Картофель' },
        protein: { id: 'omelet-vegetables-ham', name: 'Омлет с овощами и ветчиной/курицей' },
        veggies: { id: 'mixed-vegetables', name: 'Овощи' }
      },
      7: { // Sunday
        garnish: { id: 'bulgur', name: 'Булгур' },
        protein: { id: 'vegetable-stew-beef', name: 'Овощное рагу с говядиной' },
        veggies: { id: 'mixed-vegetables', name: 'Овощи' }
      }
    }
  }
];
