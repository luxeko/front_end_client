'use client';

import { useEffect, useState } from 'react';

const useThemeSwitcher = () => {
  const getPreferredTheme = () => {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };
  const initializeTheme = () => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const preferredTheme = getPreferredTheme();
    window.localStorage.setItem('theme', preferredTheme);
    return preferredTheme;
  };

  const [theme, setTheme] = useState(initializeTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return { theme, toggleTheme };
};

export default useThemeSwitcher;
