import { useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          globalStyles: () => ({
            'html, body, #root': {
              height: '100%',
              minHeight: '100%',
            },
          }),
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default Theme;
