# Family Dinner Menu - Telegram Mini App

A React-based Telegram Mini App for planning family dinners and managing shopping lists.

## Features

- **Weekly Menu Planning**: View dinner plans for the current week with a 4-week rotation cycle
- **Smart Shopping Lists**: Automatically aggregated ingredient lists based on the week's menu
- **Telegram Integration**: Full Telegram WebApp SDK integration with MainButton, themes, and haptic feedback
- **Offline-First**: Local storage with optional cloud sync (planned for v1.2)
- **Responsive Design**: Optimized for mobile devices with dark/light theme support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand with localStorage persistence
- **Styling**: TailwindCSS with Telegram theme integration
- **Date Handling**: dayjs with timezone support (Europe/Budapest)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

### Testing

```bash
npm run test
npm run lint
```

## Deployment

The app is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

For Telegram Mini App setup:
1. Create a bot with BotFather
2. Set the Mini App URL in bot settings
3. Configure the web app domain

## Architecture

### File Structure

```
src/
├── components/          # React components
│   ├── AppShell.tsx    # Main app wrapper with Telegram integration
│   ├── WeekHeader.tsx  # Week navigation header
│   ├── MenuView.tsx    # Weekly menu display
│   ├── DayCard.tsx     # Individual day menu card
│   └── ShoppingView.tsx # Shopping list with categories
├── data/               # Seed data and constants
│   ├── seedMenus.ts    # 4-week menu cycle
│   └── seedIngredients.ts # Ingredient database and mappings
├── hooks/              # React hooks
│   └── useTelegram.ts  # Telegram WebApp SDK integration
├── store/              # State management
│   └── appStore.ts     # Zustand store with persistence
├── types/              # TypeScript type definitions
│   └── index.ts        # Domain types and interfaces
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date and week calculations
│   └── shoppingUtils.ts # Shopping list aggregation
└── main.tsx           # App entry point
```

### Key Features

#### Week Calculation
- Uses Europe/Budapest timezone
- 4-week rotation cycle starting from a configurable base week
- Automatic week detection and shopping list reset

#### Shopping List Aggregation
- Automatically aggregates ingredients from all 7 meals of the current week
- Groups items by category (Meat, Fish, Grains, Vegetables, etc.)
- Tracks completion progress with persistent checkboxes

#### Telegram Integration
- Theme adaptation from Telegram app
- MainButton context switching (Menu/Shopping actions)
- Haptic feedback for interactions
- BackButton support for navigation

## Roadmap

### v1.0 (Current)
- ✅ Weekly menu display
- ✅ Shopping list with checkboxes
- ✅ Local storage persistence
- ✅ Telegram MainButton/theme integration
- ✅ Dark/light theme support
- ✅ Bundle size optimization (<200KB gzip)

### v1.1 (Planned)
- [ ] Menu editing (swap dishes)
- [ ] Week navigation controls
- [ ] Settings panel

### v1.2 (Planned)
- [ ] Cloud synchronization (Supabase/Firebase)
- [ ] Household sharing with invite links
- [ ] Telegram bot integration for reminders

### v1.3 (Future)
- [ ] Recipe integration
- [ ] Quantity calculations
- [ ] Multi-language support (i18n)

## Environment Variables

For cloud sync (v1.2+):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
