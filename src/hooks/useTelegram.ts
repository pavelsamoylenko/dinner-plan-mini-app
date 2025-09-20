import { useEffect, useState, useCallback } from 'react';
import { TelegramTheme, TelegramUser } from '@/types';

interface TelegramHook {
  isReady: boolean;
  isTelegram: boolean;
  user?: TelegramUser;
  theme: TelegramTheme;
  colorScheme: 'light' | 'dark';
  
  // MainButton controls
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
  updateMainButton: (text: string, isActive?: boolean) => void;
  
  // Other controls
  expand: () => void;
  close: () => void;
  showBackButton: (onClick: () => void) => void;
  hideBackButton: () => void;
  
  // Haptic feedback
  hapticFeedback: (type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error' | 'warning') => void;
  
  // Popup
  showPopup: (message: string, title?: string) => Promise<string>;
}

const defaultTheme: TelegramTheme = {
  bg_color: '#ffffff',
  text_color: '#000000',
  hint_color: '#999999',
  link_color: '#168dcd',
  button_color: '#40a7e3',
  button_text_color: '#ffffff',
  secondary_bg_color: '#f1f1f1'
};

export function useTelegram(): TelegramHook {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState<TelegramTheme>(defaultTheme);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<TelegramUser | undefined>();
  const [mainButtonCallback, setMainButtonCallback] = useState<(() => void) | null>(null);
  const [backButtonCallback, setBackButtonCallback] = useState<(() => void) | null>(null);

  const isTelegram = typeof window !== 'undefined' && !!window.Telegram?.WebApp;
  const webApp = window.Telegram?.WebApp;

  // Initialize Telegram WebApp
  useEffect(() => {
    if (!isTelegram || !webApp) {
      setIsReady(true);
      return;
    }

    try {
      // Initialize WebApp
      webApp.ready();
      webApp.expand();

      // Set initial theme
      const themeParams = webApp.themeParams;
      if (themeParams && Object.keys(themeParams).length > 0) {
        setTheme(themeParams as TelegramTheme);
      }
      
      setColorScheme(webApp.colorScheme || 'light');

      // Set user data
      if (webApp.initDataUnsafe?.user) {
        setUser(webApp.initDataUnsafe.user);
      }

      // Listen for theme changes
      const handleThemeChanged = () => {
        setColorScheme(webApp.colorScheme || 'light');
        if (webApp.themeParams) {
          setTheme(webApp.themeParams as TelegramTheme);
        }
      };

      webApp.onEvent('themeChanged', handleThemeChanged);

      setIsReady(true);

      return () => {
        webApp.offEvent('themeChanged', handleThemeChanged);
      };
    } catch (error) {
      console.error('Failed to initialize Telegram WebApp:', error);
      setIsReady(true);
    }
  }, [isTelegram, webApp]);

  // Apply theme to CSS variables
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    root.style.setProperty('--tg-bg-color', theme.bg_color);
    root.style.setProperty('--tg-text-color', theme.text_color);
    root.style.setProperty('--tg-hint-color', theme.hint_color);
    root.style.setProperty('--tg-link-color', theme.link_color);
    root.style.setProperty('--tg-button-color', theme.button_color);
    root.style.setProperty('--tg-button-text-color', theme.button_text_color);
    root.style.setProperty('--tg-secondary-bg-color', theme.secondary_bg_color);

    // Apply dark/light class
    document.documentElement.classList.toggle('dark', colorScheme === 'dark');
  }, [theme, colorScheme]);

  const showMainButton = useCallback((text: string, onClick: () => void) => {
    if (!isTelegram || !webApp?.MainButton) return;

    // Clean up previous callback
    if (mainButtonCallback) {
      webApp.MainButton.offClick(mainButtonCallback);
    }

    webApp.MainButton.setText(text);
    webApp.MainButton.show();
    webApp.MainButton.enable();
    webApp.MainButton.onClick(onClick);
    
    setMainButtonCallback(() => onClick);
  }, [isTelegram, webApp]);

  const hideMainButton = useCallback(() => {
    if (!isTelegram || !webApp?.MainButton) return;

    webApp.MainButton.hide();
    
    if (mainButtonCallback) {
      webApp.MainButton.offClick(mainButtonCallback);
      setMainButtonCallback(null);
    }
  }, [isTelegram, webApp]);

  const updateMainButton = useCallback((text: string, isActive: boolean = true) => {
    if (!isTelegram || !webApp?.MainButton) return;

    webApp.MainButton.setText(text);
    
    if (isActive) {
      webApp.MainButton.enable();
    } else {
      webApp.MainButton.disable();
    }
  }, [isTelegram, webApp]);

  const expand = useCallback(() => {
    if (!isTelegram || !webApp) return;
    webApp.expand();
  }, [isTelegram, webApp]);

  const close = useCallback(() => {
    if (!isTelegram || !webApp) return;
    webApp.close();
  }, [isTelegram, webApp]);

  const showBackButton = useCallback((onClick: () => void) => {
    if (!isTelegram || !webApp?.BackButton) return;

    // Clean up previous callback
    if (backButtonCallback) {
      webApp.BackButton.offClick(backButtonCallback);
    }

    webApp.BackButton.show();
    webApp.BackButton.onClick(onClick);
    setBackButtonCallback(() => onClick);
  }, [isTelegram, webApp, backButtonCallback]);

  const hideBackButton = useCallback(() => {
    if (!isTelegram || !webApp?.BackButton) return;

    webApp.BackButton.hide();
    
    if (backButtonCallback) {
      webApp.BackButton.offClick(backButtonCallback);
      setBackButtonCallback(null);
    }
  }, [isTelegram, webApp, backButtonCallback]);

  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error' | 'warning') => {
    if (!isTelegram || !webApp?.HapticFeedback) return;

    switch (type) {
      case 'light':
      case 'medium':
      case 'heavy':
        webApp.HapticFeedback.impactOccurred(type);
        break;
      case 'selection':
        webApp.HapticFeedback.selectionChanged();
        break;
      case 'success':
      case 'error':
      case 'warning':
        webApp.HapticFeedback.notificationOccurred(type);
        break;
    }
  }, [isTelegram, webApp]);

  const showPopup = useCallback((message: string, title?: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!isTelegram || !webApp) {
        // Fallback for non-Telegram environment
        const result = window.confirm(title ? `${title}\n\n${message}` : message);
        resolve(result ? 'ok' : 'cancel');
        return;
      }

      webApp.showPopup({
        title,
        message,
        buttons: [
          { type: 'ok', text: 'OK' },
          { type: 'cancel', text: 'Отмена' }
        ]
      }, (buttonId) => {
        resolve(buttonId || 'cancel');
      });
    });
  }, [isTelegram, webApp]);

  return {
    isReady,
    isTelegram,
    user,
    theme,
    colorScheme,
    showMainButton,
    hideMainButton,
    updateMainButton,
    expand,
    close,
    showBackButton,
    hideBackButton,
    hapticFeedback,
    showPopup
  };
}
